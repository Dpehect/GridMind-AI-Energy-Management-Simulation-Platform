export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  href?: string;
};

export type GlobalSearchResult = {
  id: string;
  type:
    | "building"
    | "device"
    | "work_order"
    | "report"
    | "goal"
    | "inventory";
  title: string;
  subtitle?: string;
  href: string;
};

export type HelpArticle = {
  id: string;
  title: string;
  summary: string;
  category: string;
  href: string;
};
