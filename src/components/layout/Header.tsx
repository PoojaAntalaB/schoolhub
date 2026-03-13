import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const initials =
    user?.user_metadata?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">SchoolHub</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:block">
          {user?.user_metadata?.full_name ?? user?.email}
        </span>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
