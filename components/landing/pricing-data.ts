export const BILLING_PERIODS = [
  {
    label: "Monthly",
    key: "monthly",
    saving: null,
  },
  {
    label: "Annually",
    key: "yearly",
    saving: "20%",
  },
] as const;

const AMOUNTS = {
  free: {
    monthly: 0,
    yearly: 0,
  },
  team: {
    monthly: 29,
    yearly: 278,
  },
  business: {
    monthly: 79,
    yearly: 758,
  },
  enterprise: {
    monthly: null,
    yearly: null,
  },
};

export type TBILLING_PLAN = (typeof BILLING_PLANS)[number];
export const BILLING_PLANS = [
  {
    name: "Free",
    description:
      "Perfect for open source projects and individual developers getting started.",
    pricing: {
      monthly: {
        amount: AMOUNTS["free"]["monthly"],
        formattedPrice: "$" + AMOUNTS["free"]["monthly"],
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS["free"]["yearly"],
        formattedPrice: "$" + AMOUNTS["free"]["yearly"],
        stripeId: null,
      },
    },
    features: [
      "Up to 3 repositories",
      "100 PR reviews / month",
      "Basic code analysis",
      "GitHub integration",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Team",
    description: "For development teams who want faster, smarter code reviews.",
    pricing: {
      monthly: {
        amount: AMOUNTS["team"]["monthly"],
        formattedPrice: "$" + AMOUNTS["team"]["monthly"],
        stripeId: process.env.NEXT_PUBLIC_TEAM_MONTHLY_PRICE_ID!,
      },
      yearly: {
        amount: AMOUNTS["team"]["yearly"],
        formattedPrice: "$" + AMOUNTS["team"]["yearly"],
        stripeId: process.env.NEXT_PUBLIC_TEAM_YEARLY_PRICE_ID!,
      },
    },
    features: [
      "Everything in Free",
      "Unlimited repositories",
      "Unlimited PR reviews",
      "Security vulnerability scanning",
      "Custom review rules",
      "Slack & Teams notifications",
      "Priority email support",
    ],
    cta: "Start Trial",
    popular: true,
  },
  {
    name: "Business",
    description:
      "For organizations with strict security and compliance requirements.",
    pricing: {
      monthly: {
        amount: AMOUNTS["business"]["monthly"],
        formattedPrice: "$" + AMOUNTS["business"]["monthly"],
        stripeId: process.env.NEXT_PUBLIC_BUSINESS_MONTHLY_PRICE_ID!,
      },
      yearly: {
        amount: AMOUNTS["business"]["yearly"],
        formattedPrice: "$" + AMOUNTS["business"]["yearly"],
        stripeId: process.env.NEXT_PUBLIC_BUSINESS_YEARLY_PRICE_ID!,
      },
    },
    features: [
      "Everything in Team",
      "Advanced security analysis",
      "SAST & dependency scanning",
      "Custom AI model training",
      "SOC 2 compliance reports",
      "Self-hosted runner option",
      "Dedicated account manager",
      "24/7 phone support",
    ],
    cta: "Start Trial",
    popular: false,
  },
  {
    name: "Enterprise",
    description:
      "Custom solutions for large organizations with specific needs.",
    pricing: {
      monthly: {
        amount: AMOUNTS["enterprise"]["monthly"],
        formattedPrice: "Custom",
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS["enterprise"]["yearly"],
        formattedPrice: "Custom",
        stripeId: null,
      },
    },
    features: [
      "Everything in Business",
      "On-premise deployment",
      "Air-gapped environments",
      "Custom integrations",
      "Dedicated infrastructure",
      "SLA with 99.99% uptime",
      "SSO & audit logging",
      "Custom training & onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];
