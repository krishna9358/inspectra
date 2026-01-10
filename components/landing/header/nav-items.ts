export const navItems = [
  {
    type: "link",
    href: "/",
    label: "Home",
  },
  {
    type: "link",
    label: "Features",
    href: "/#features",
  },
  {
    type: "link",
    label: "Pricing",
    href: "/#pricing",
  },
  {
    type: "link",
    label: "FAQ",
    href: "/#faq",
  },
] satisfies NavItem[];

type NavItem = Record<string, string | unknown> &
  (
    | {
        type: "link";
        href: string;
      }
    | {
        type: "dropdown";
      }
  );
