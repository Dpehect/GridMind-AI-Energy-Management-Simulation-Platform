import { describe, expect, it } from "vitest";
import {
  createObservabilityContext,
  getObservabilityContext,
  runWithObservabilityContext
} from "@/lib/observability/context";

describe("observability context", () => {
  it("propagates request context", () => {
    const context =
      createObservabilityContext();

    runWithObservabilityContext(
      context,
      () => {
        expect(
          getObservabilityContext()?.requestId
        ).toBe(context.requestId);
      }
    );
  });
});
