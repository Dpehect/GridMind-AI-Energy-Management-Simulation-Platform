export type MutationContext = {
  actor: string;
  workspaceId: string;
  requestId?: string;
};

export type VersionedMutationInput<T> = {
  id: string;
  expectedVersion: number;
  data: T;
};

export type SoftDeleteResult = {
  id: string;
  deletedAt: string;
};

export type RestoreResult = {
  id: string;
  restoredAt: string;
};
