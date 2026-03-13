"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "@/lib/validations/auth";

type ActionResult = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function loginAction(formData: unknown): Promise<ActionResult | void> {
  const parsed = loginSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      error: "Invalid login details.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function registerAction(formData: unknown): Promise<ActionResult | void> {
  const parsed = registerSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      error: "Invalid registration details.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.full_name } },
  });

  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
