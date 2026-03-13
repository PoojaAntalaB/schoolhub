import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, GraduationCap, School, BookOpen } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "Admin";

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Good morning, {firstName}!
        </h2>
        <p className="text-muted-foreground mt-1">
          Welcome to SchoolHub. Here&apos;s your school overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value="1,248"
          description="Enrolled this year"
          icon={Users}
          color="text-blue-500"
        />
        <StatsCard
          title="Total Teachers"
          value="86"
          description="Active faculty members"
          icon={GraduationCap}
          color="text-green-500"
        />
        <StatsCard
          title="Classes"
          value="42"
          description="Across all grades"
          icon={School}
          color="text-purple-500"
        />
        <StatsCard
          title="Subjects"
          value="18"
          description="Offered this semester"
          icon={BookOpen}
          color="text-orange-500"
        />
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold text-gray-800 mb-3">System Info</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Logged in as</span>
            <p className="font-medium">{user?.user_metadata?.full_name ?? "Admin"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Email</span>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Role</span>
            <p className="font-medium capitalize">Administrator</p>
          </div>
          <div>
            <span className="text-muted-foreground">Academic Year</span>
            <p className="font-medium">2025 - 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
