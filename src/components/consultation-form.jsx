"use client";

import { useActionState, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CircleNotchIcon,
  PaperPlaneTiltIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/ssr";

import { submitEnquiry } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EASE } from "@/components/motion";
import { CLIENT_TYPES, SERVICE_OPTIONS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const COPY = {
  home: {
    title: "Book a free consultation",
    intro: "Tell us what you need and an accountant will be in touch.",
    messageLabel: "How can we help?",
    messagePlaceholder: "A few words about your business or tax situation",
    rows: 3,
    submit: "Request a call back",
    SubmitIcon: ArrowRightIcon,
    thanks: "An accountant from TouchTax will contact you shortly to arrange your consultation.",
  },
  contact: {
    title: "Send us a message",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your situation",
    rows: 5,
    submit: "Send message",
    SubmitIcon: PaperPlaneTiltIcon,
    thanks: "An accountant from TouchTax will contact you shortly.",
  },
};

const fieldClass = "h-[42px] bg-white px-3 text-[15px] md:text-[15px]";

export function ConsultationForm({ variant = "home" }) {
  const [round, setRound] = useState(0);
  const [sent, setSent] = useState(false);
  const copy = COPY[variant];

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="flex flex-col gap-2 py-6"
          role="status"
        >
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.1 }}
            className="w-fit"
          >
            <CheckCircleIcon weight="duotone" className="size-11 text-brand" />
          </motion.span>
          <h2 className="mt-2 text-[26px] leading-tight">Thank you, we’ve got your message</h2>
          <p className="text-base text-muted-foreground">{copy.thanks}</p>
          <Button
            variant="outline"
            size="lg"
            className="mt-2 self-start bg-white px-4"
            onClick={() => {
              setRound((r) => r + 1);
              setSent(false);
            }}
          >
            Send another enquiry
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key={`form-${round}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <EnquiryForm variant={variant} copy={copy} onSent={() => setSent(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EnquiryForm({ variant, copy, onSent }) {
  const id = useId();
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [clientType, setClientType] = useState(CLIENT_TYPES[0]);
  const [state, formAction, pending] = useActionState(async (prev, formData) => {
    const result = await submitEnquiry(prev, formData);
    if (result.status === "success") onSent();
    return result;
  }, { status: "idle" });

  const errors = state.errors ?? {};
  const values = state.values ?? {};
  const { SubmitIcon } = copy;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <div>
        <h2 className="text-[26px] leading-tight">{copy.title}</h2>
        {copy.intro && <p className="mt-1.5 text-[15px] text-muted-foreground">{copy.intro}</p>}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <Field id={`${id}-name`} label="Full name" error={errors.name}>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            placeholder="Jane Smith"
            defaultValue={values.name}
            aria-invalid={!!errors.name || undefined}
            className={fieldClass}
          />
        </Field>
        <Field id={`${id}-email`} label="Email" error={errors.email}>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jane@company.co.uk"
            defaultValue={values.email}
            aria-invalid={!!errors.email || undefined}
            className={fieldClass}
          />
        </Field>
        <Field id={`${id}-phone`} label="Phone" error={errors.phone}>
          <Input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="07700 900000"
            defaultValue={values.phone}
            aria-invalid={!!errors.phone || undefined}
            className={fieldClass}
          />
        </Field>
        {variant === "contact" ? (
          <Field id={`${id}-type`} label="I am a">
            <ChoiceSelect id={`${id}-type`} name="clientType" value={clientType} onChange={setClientType} options={CLIENT_TYPES} />
          </Field>
        ) : (
          <Field id={`${id}-svc`} label="Service">
            <ChoiceSelect id={`${id}-svc`} name="service" value={service} onChange={setService} options={SERVICE_OPTIONS} />
          </Field>
        )}
      </div>

      {variant === "contact" && (
        <Field id={`${id}-svc`} label="Service">
          <ChoiceSelect id={`${id}-svc`} name="service" value={service} onChange={setService} options={SERVICE_OPTIONS} />
        </Field>
      )}

      <Field id={`${id}-msg`} label={copy.messageLabel} error={errors.message}>
        <Textarea
          id={`${id}-msg`}
          name="message"
          rows={copy.rows}
          placeholder={copy.messagePlaceholder}
          defaultValue={values.message}
          aria-invalid={!!errors.message || undefined}
          className={cn("field-sizing-fixed resize-y bg-white px-3 text-[15px] md:text-[15px]")}
        />
      </Field>

      <AnimatePresence>
        {errors.form && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-destructive"
            role="alert"
          >
            <WarningCircleIcon weight="duotone" className="size-5" />
            {errors.form}
          </motion.p>
        )}
      </AnimatePresence>

      <Button type="submit" size="xl" disabled={pending} className="h-[46px] text-base">
        {pending ? (
          <>
            <CircleNotchIcon className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            {copy.submit}
            <SubmitIcon weight="duotone" />
          </>
        )}
      </Button>
      {variant === "home" && (
        <p className="text-xs text-foreground/70">We only use your details to respond to your enquiry.</p>
      )}
    </form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.span
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[13px] text-destructive"
            role="alert"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChoiceSelect({ id, name, value, onChange, options }) {
  return (
    <Select name={name} value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="h-[42px] w-full bg-white px-3 text-[15px] data-[size=default]:h-[42px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o} className="py-2 text-[15px]">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
