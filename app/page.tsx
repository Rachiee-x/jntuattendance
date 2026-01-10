import { getSubjects } from "@/app/actions/subject";
import { getSession } from "@/lib/auth";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const subjects = await getSubjects();

  return <DashboardView subjects={subjects} username={session.username} />;
}
