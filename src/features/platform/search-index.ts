export const searchIndex = [
  { id: "s1", title: "Energy Command Center", href: "/dashboard", keywords: ["overview","kpi","energy","command"] },
  { id: "s2", title: "Buildings", href: "/dashboard/buildings", keywords: ["building","floor","zone"] },
  { id: "s3", title: "Maintenance", href: "/dashboard/maintenance", keywords: ["device","health","work order"] },
  { id: "s4", title: "Goals & Recommendations", href: "/dashboard/goals", keywords: ["goal","action","recommendation"] },
  { id: "s5", title: "Reporting Studio", href: "/dashboard/reports", keywords: ["report","export","pdf"] },
  { id: "s6", title: "Administration", href: "/dashboard/admin", keywords: ["admin","users","audit","settings"] }
];

export function searchPlatform(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return searchIndex;
  return searchIndex.filter((item) =>
    [item.title, ...item.keywords].some((value) => value.toLowerCase().includes(normalized))
  );
}
