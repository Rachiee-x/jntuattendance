import { getSubjects } from "@/app/actions/subject";
import { getSession } from "@/lib/auth";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  // If not authenticated, show a simple landing page with visible auth links
  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to Attendance</h1>
          <p className="mb-6">Sign in or create an account to manage subjects and attendance.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="inline-block rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700">
              Log in
            </Link>
            <Link href="/signup" className="inline-block rounded-md px-4 py-2 border border-neutral-200 hover:bg-neutral-50">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const subjects = await getSubjects();

  return <DashboardView subjects={subjects} username={(session.name || session.email) as string} />;
}
