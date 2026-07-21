import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { helpArticles } from "./help-center";
import { SectionCard } from "@/components/ui/section-card";

export function ContextualHelp({ category }: { category?: string }) {
  const items = category
    ? helpArticles.filter((article) => article.category === category)
    : helpArticles;

  return (
    <SectionCard
      title="Help & guidance"
      description="Contextual documentation for the current workflow."
    >
      <div className="space-y-3">
        {items.map((article) => (
          <Link
            key={article.id}
            href={article.href}
            className="flex items-start gap-3 rounded-2xl border border-border p-4 hover:bg-accent"
          >
            <BookOpen className="mt-0.5 size-5 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{article.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {article.summary}
              </p>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </SectionCard>
  );
}
