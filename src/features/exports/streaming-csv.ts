import { escapeCsvCell } from "@/lib/security";

export function createCsvStream<T extends Record<string, unknown>>(
  headers: Array<keyof T>,
  source: AsyncIterable<T>
) {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      controller.enqueue(
        encoder.encode(
          headers.map((header) => escapeCsvCell(String(header))).join(",") +
            "\n"
        )
      );

      try {
        for await (const row of source) {
          controller.enqueue(
            encoder.encode(
              headers
                .map((header) => escapeCsvCell(row[header]))
                .join(",") + "\n"
            )
          );
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    }
  });
}
