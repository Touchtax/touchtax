"use server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles consultation / contact enquiries.
 * Validates on the server, then hands the enquiry to `deliverEnquiry`.
 */
export async function submitEnquiry(_prevState, formData) {
  const enquiry = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    clientType: String(formData.get("clientType") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors = {};
  if (enquiry.name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(enquiry.email)) errors.email = "Please enter a valid email address.";
  if (enquiry.phone && !/^[+\d][\d\s()-]{6,}$/.test(enquiry.phone)) errors.phone = "Please enter a valid phone number.";
  if (enquiry.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";

  if (Object.keys(errors).length) {
    return { status: "error", errors, values: enquiry };
  }

  try {
    await deliverEnquiry(enquiry);
  } catch (err) {
    console.error("Failed to deliver enquiry", err);
    return {
      status: "error",
      errors: { form: "Something went wrong sending your message. Please call us instead." },
      values: enquiry,
    };
  }

  return { status: "success" };
}

// Replace with your email provider or CRM (e.g. Resend, Postmark, HubSpot).
async function deliverEnquiry(enquiry) {
  console.info("[TouchTax] New enquiry", { ...enquiry, receivedAt: new Date().toISOString() });
}
