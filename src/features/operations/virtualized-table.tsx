"use client";

import { useMemo, useRef, useState } from "react";

export function VirtualizedTable<T>({
  items,
  rowHeight = 48,
  height = 480,
  renderRow
}: {
  items: T[];
  rowHeight?: number;
  height?: number;
  renderRow: (item: T, index: number) => React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const overscan = 8;
  const start = Math.max(
    0,
    Math.floor(scrollTop / rowHeight) - overscan
  );
  const visibleCount =
    Math.ceil(height / rowHeight) + overscan * 2;
  const end = Math.min(
    items.length,
    start + visibleCount
  );

  const visible = useMemo(
    () => items.slice(start, end),
    [items, start, end]
  );

  return (
    <div
      ref={containerRef}
      style={{ height, overflowY: "auto" }}
      onScroll={(event) =>
        setScrollTop(event.currentTarget.scrollTop)
      }
      className="relative rounded-2xl border border-border"
    >
      <div
        style={{
          height: items.length * rowHeight,
          position: "relative"
        }}
      >
        <div
          style={{
            transform: `translateY(${start * rowHeight}px)`
          }}
        >
          {visible.map((item, index) => (
            <div
              key={start + index}
              style={{ height: rowHeight }}
              className="border-b border-border/60"
            >
              {renderRow(item, start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
