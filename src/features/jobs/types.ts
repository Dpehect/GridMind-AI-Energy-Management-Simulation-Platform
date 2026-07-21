export type JobStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export type JobHandler<TPayload = unknown, TResult = unknown> = (
  payload: TPayload,
  context: {
    jobId: string;
    workspaceId?: string;
    attempt: number;
    workerId: string;
  }
) => Promise<TResult>;
