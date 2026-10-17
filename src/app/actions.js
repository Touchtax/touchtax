"use server";

import nodemailer from "nodemailer";

import { SITE } from "@/lib/site-data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles consultation / contact enquiries.
 * Validates on the server, then emails the enquiry to the configured inbox.
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

async function deliverEnquiry(enquiry) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } = process.env;
  const port = Number(SMTP_PORT);

  if (!SMTP_HOST || !SMTP_PORT || !Number.isInteger(port) || port < 1 || port > 65535 || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL_TO) {
    throw new Error("Contact form SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_EMAIL_TO.");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const fields = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not provided"],
    ["Client type", enquiry.clientType || "Not provided"],
    ["Service", enquiry.service || "Not provided"],
    ["Message", enquiry.message || "Not provided"],
  ];
  const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]);

  await transporter.sendMail({
    from: SMTP_USER,
    to: CONTACT_EMAIL_TO,
    replyTo: enquiry.email,
    subject: `New enquiry from ${SITE.shortName} website`,
    text: fields.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<h1>New website enquiry</h1><dl>${fields.map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value).replace(/\n/g, "<br>")}</dd>`).join("")}</dl>`,
  });
}
