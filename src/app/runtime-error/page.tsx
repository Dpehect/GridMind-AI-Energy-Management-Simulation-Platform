import { ConfigurationError } from "@/components/system/configuration-error";

export default function RuntimeErrorPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  return searchParams.then(({ message }) => (
    <ConfigurationError
      detail={
        message ??
        "The runtime could not complete its startup checks."
      }
    />
  ));
}
