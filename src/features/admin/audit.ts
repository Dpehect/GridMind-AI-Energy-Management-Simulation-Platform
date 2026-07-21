
export type AuditEvent={
 id:string;
 actor:string;
 action:string;
 createdAt:string;
};

export const auditLog:AuditEvent[]=[];
