import { cookies } from "next/headers";
import { localUsers } from "./data";

const SESSION_COOKIE = "gridmind-local-session";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(SESSION_COOKIE)?.value ?? "usr-1";
  return localUsers.find((user) => user.id === userId) ?? localUsers[0];
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user || !user.active) throw new Error("Local session is not active");
  return user;
}
