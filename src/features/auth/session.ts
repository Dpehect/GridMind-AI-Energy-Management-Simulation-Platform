
export function hasPermission(role:string,permission:string){
 const map:any={
  Admin:["*"],
  "Energy Manager":["energy.read","energy.write","reports.generate"],
  "Facility Manager":["maintenance.read","maintenance.write"],
  Analyst:["energy.read","reports.generate"],
  Viewer:["energy.read"]
 };
 return map[role]?.includes("*")||map[role]?.includes(permission);
}
