"use client";

import { create } from "zustand";
import { reportTemplates } from "./data";
import type { ReportBlock } from "./types";

type ReportStudioState = {
  templateId: string;
  blocks: ReportBlock[];
  previewMode: "editor" | "preview";
  setTemplate: (templateId: string) => void;
  toggleBlock: (blockId: string) => void;
  moveBlock: (blockId: string, direction: -1 | 1) => void;
  setPreviewMode: (mode: "editor" | "preview") => void;
};

export const useReportStore = create<ReportStudioState>((set) => ({
  templateId: reportTemplates[0].id,
  blocks: reportTemplates[0].blocks,
  previewMode: "editor",
  setTemplate: (templateId) => {
    const template = reportTemplates.find((item) => item.id === templateId) ?? reportTemplates[0];
    set({ templateId, blocks: template.blocks });
  },
  toggleBlock: (blockId) => set((state) => ({
    blocks: state.blocks.map((block) => block.id === blockId ? { ...block, enabled: !block.enabled } : block)
  })),
  moveBlock: (blockId, direction) => set((state) => {
    const ordered = [...state.blocks].sort((a, b) => a.order - b.order);
    const index = ordered.findIndex((item) => item.id === blockId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= ordered.length) return state;
    [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
    return { blocks: ordered.map((item, order) => ({ ...item, order })) };
  }),
  setPreviewMode: (previewMode) => set({ previewMode })
}));
