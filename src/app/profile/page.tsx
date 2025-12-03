import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";

const normalizeSlug = (value?: string | null) => {
  if (!value) {
    return null;
  }
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) {
    return null;
  }
  const slug = trimmed.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || null;
};

export default async function ProfileRedirectPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/");
  }

  const displaySlug = normalizeSlug(user?.displayName);
  const emailSlug = normalizeSlug(user?.primaryEmail?.split("@")[0]);
  const slug = displaySlug ?? emailSlug ?? "player";

  redirect(`/profile/${encodeURIComponent(slug)}`);
}
