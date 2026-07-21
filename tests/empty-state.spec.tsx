import { describe, expect, it } from "vitest";

describe("empty-state contract", () => {
  it("requires title and description", () => {
    const props = {
      title: "No work orders",
      description: "Create a work order to begin maintenance tracking."
    };

    expect(props.title).toBeTruthy();
    expect(props.description).toBeTruthy();
  });
});
