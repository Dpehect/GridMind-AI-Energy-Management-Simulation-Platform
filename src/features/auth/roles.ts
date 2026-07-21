
export const roles=[
"Admin",
"Energy Manager",
"Facility Manager",
"Analyst",
"Viewer"
] as const;

export const permissions={
Admin:["*"],
"Energy Manager":["energy.read","energy.write","reports.generate"],
"Facility Manager":["maintenance.read","maintenance.write"],
Analyst:["energy.read","reports.generate"],
Viewer:["energy.read"]
};
