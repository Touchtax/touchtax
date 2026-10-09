import {
  BellRingingIcon,
  BriefcaseIcon,
  BuildingsIcon,
  CalculatorIcon,
  CalendarCheckIcon,
  ChartLineUpIcon,
  ChatsCircleIcon,
  ClockIcon,
  CloudArrowUpIcon,
  CompassIcon,
  EnvelopeSimpleIcon,
  HandshakeIcon,
  HouseLineIcon,
  LightbulbIcon,
  PhoneIcon,
  PiggyBankIcon,
  ReceiptIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@phosphor-icons/react/ssr";

export const PHONE = { display: "020 7946 0000", href: "tel:+442079460000" };
export const EMAIL = { display: "hello@touchtax.co.uk", href: "mailto:hello@touchtax.co.uk" };

export const SERVICES = [
  {
    key: "accounting",
    title: "Accounting & Compliance",
    short: "Accounting",
    icon: CalculatorIcon,
    blurb: "Accurate books and on-time filings, so Companies House and HMRC never need to chase you.",
    items: [
      ["Annual Accounts", "Year-end statutory accounts prepared and filed with Companies House and HMRC."],
      ["Bookkeeping", "Transactions recorded and reconciled each month in your cloud accounting software."],
      ["Management Accounts", "Monthly or quarterly reports that show how the business is really performing."],
      ["Payroll", "Payslips, RTI submissions, pension auto-enrolment and year-end forms each pay run."],
      ["VAT Returns", "Making Tax Digital compliant VAT returns, prepared and submitted on time."],
      ["Confirmation Statement", "Your annual Companies House confirmation statement, checked and filed."],
    ],
  },
  {
    key: "tax",
    title: "Tax Services",
    short: "Tax",
    icon: ReceiptIcon,
    blurb: "Returns prepared properly and planning that keeps more of what you earn, within the rules.",
    items: [
      ["Self Assessment", "Personal tax returns prepared, reviewed and filed ahead of the 31 January deadline."],
      ["Corporation Tax", "CT600 returns and tax computations for limited companies."],
      ["Capital Gains Tax", "Gains calculated and reported on property, shares and business assets."],
      ["Tax Planning", "Forward-looking advice on salary, dividends, pensions and available reliefs."],
      ["Non Resident Landlord Tax", "UK rental income reporting and NRL scheme support for overseas landlords."],
    ],
  },
  {
    key: "advisory",
    title: "Business Advisory",
    short: "Advisory",
    icon: ChartLineUpIcon,
    blurb: "Practical financial guidance for founders, from the first day of trading to scaling up.",
    items: [
      ["Startup Support", "The right structure, registrations and finance set-up from day one."],
      ["Company Formation", "Limited company incorporation, share structure and HMRC registration."],
      ["Cashflow Forecasting", "Rolling forecasts that show shortfalls and headroom well in advance."],
      ["CFO Advisory", "Part-time finance leadership for budgeting, fundraising and board reporting."],
      ["Business Growth Planning", "Targets, pricing and investment decisions grounded in your numbers."],
    ],
  },
  {
    key: "property",
    title: "Property Services",
    short: "Property",
    icon: BuildingsIcon,
    blurb: "Specialist accounting for landlords, portfolio investors and property companies.",
    items: [
      ["Landlord Accounting", "Rental income and expenses recorded and reported for individual landlords."],
      ["SPV Accounting", "Accounts and Corporation Tax for special purpose vehicle property companies."],
      ["Property Tax Returns", "Property income, finance cost relief and allowable expenses reported correctly."],
      ["HMO / Holiday Let Accounting", "Accounts for houses in multiple occupation and short-term holiday lets."],
    ],
  },
].map((c, i) => ({
  ...c,
  num: String(i + 1).padStart(2, "0"),
  href: `/services#svc-${c.key}`,
  items: c.items.map(([name, desc]) => ({ name, desc })),
}));

export const AUDIENCES = [
  { title: "Individuals", icon: UserIcon, items: ["Self Employed", "Freelancers", "High Net Worth Individuals", "CIS Contractors"] },
  { title: "Businesses", icon: BriefcaseIcon, items: ["Startups", "Limited Companies", "Small Businesses", "Contractors"] },
  { title: "Property", icon: HouseLineIcon, items: ["Landlords", "Non Resident Landlords", "SPV Companies", "Property Investors"] },
  { title: "Specialists", icon: SealCheckIcon, items: ["Charities", "Consultants", "Healthcare Professionals", "Tech Startups"] },
];

export const SERVE_HREF = "/#serve";

export const CONTACT_INFO = [
  { label: "Call us", value: PHONE.display, icon: PhoneIcon, href: PHONE.href },
  { label: "Email", value: EMAIL.display, icon: EnvelopeSimpleIcon, href: EMAIL.href },
  { label: "Office hours", value: "Mon–Fri, 9:00–17:30", icon: ClockIcon, href: null },
];

export const ABOUT_LINKS = [
  { label: "Our practice", sub: "Who we are and who we work with.", icon: BuildingsIcon, href: "/about" },
  { label: "Our approach", sub: "How we keep your finances in order.", icon: CompassIcon, href: "/about#approach" },
  { label: "What to expect", sub: "Working with your TouchTax accountant.", icon: HandshakeIcon, href: "/about#expect" },
];

export const STEPS = [
  { n: "01", title: "Start with a conversation", text: "A free consultation to understand your income, deadlines and goals." },
  { n: "02", title: "Receive a clear proposal", text: "A written scope and quote, so you know exactly what is covered." },
  { n: "03", title: "We take it from there", text: "Your accountant handles the filings and keeps you ahead of every deadline." },
];

export const APPROACH = [
  { icon: ChatsCircleIcon, title: "Plain English", text: "We explain your numbers and obligations clearly, without jargon." },
  { icon: CalendarCheckIcon, title: "Ahead of deadlines", text: "We plan the year with you so filings never become a last-minute rush." },
  { icon: LightbulbIcon, title: "Proactive advice", text: "We look for savings and opportunities throughout the year, not only at year-end." },
];

export const EXPECT = [
  { title: "A named accountant", text: "One point of contact who knows your affairs." },
  { title: "Clear, agreed fees", text: "A quote that sets out exactly what is included before work begins." },
  { title: "Prompt replies", text: "Questions answered quickly by phone or email." },
  { title: "Modern tools", text: "Cloud bookkeeping and secure document sharing." },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Not sure yet"];
export const CLIENT_TYPES = ["Individual", "Business", "Landlord or property investor", "Specialist professional"];

export const SOFTWARE = ["Xero", "QuickBooks", "Sage", "FreeAgent", "Dext", "Hubdoc", "Zoho Books", "Pandle", "IRIS", "TaxCalc"];

export const FEATURES = [
  {
    eyebrow: "Cloud bookkeeping",
    title: "Your books, always up to date",
    text: "We connect your bank feeds to cloud accounting software and reconcile every month, so you can see where the business stands at any time, not just at year-end.",
    points: [
      { icon: CloudArrowUpIcon, title: "Snap and upload receipts", text: "Photograph receipts on your phone and they land straight in your books." },
      { icon: ShieldCheckIcon, title: "Making Tax Digital ready", text: "Records and VAT returns kept in line with HMRC’s digital rules." },
    ],
    imageLabel: "Bookkeeping dashboard",
  },
  {
    eyebrow: "Tax planning",
    title: "Tax planning that starts early",
    text: "The best savings are planned months ahead. We review your position through the year and tell you what to do before the deadline, not after it has passed.",
    points: [
      { icon: PiggyBankIcon, title: "Keep more of what you earn", text: "Salary, dividends, pensions and reliefs structured to suit you." },
      { icon: BellRingingIcon, title: "Deadline reminders", text: "Clear reminders for payments on account, VAT and filing dates." },
    ],
    imageLabel: "Accountant meeting a client",
  },
];

export const STATS = [
  { value: 20, suffix: "", label: "Services across accounting, tax, advisory and property" },
  { value: 4, suffix: "", label: "Specialist practice areas under one roof" },
  { value: 1, suffix: "", label: "Named accountant who knows your affairs" },
  { value: 0, prefix: "£", suffix: "", label: "Cost of your initial consultation" },
];

export const FAQS = [
  {
    q: "Do I need an accountant for my Self Assessment?",
    a: "You don’t have to use one, but an accountant makes sure you claim every allowable expense and relief, avoid errors that trigger HMRC enquiries, and file well before the 31 January deadline.",
  },
  {
    q: "Should I operate as a sole trader or a limited company?",
    a: "It depends on your profits, plans and appetite for admin. We model both options with your figures so you can see the tax difference before deciding.",
  },
  {
    q: "Which accounting software do you work with?",
    a: "We work with all the major cloud packages including Xero, QuickBooks, Sage and FreeAgent. If you don’t use one yet, we’ll recommend and set up the right fit.",
  },
  {
    q: "How are your fees structured?",
    a: "Most clients pay a fixed monthly fee agreed upfront, so there are no surprise bills. Your written proposal sets out exactly what is included.",
  },
  {
    q: "Can you take over from my current accountant?",
    a: "Yes. We handle the professional clearance process and request your records from your previous accountant, so switching is straightforward.",
  },
];
