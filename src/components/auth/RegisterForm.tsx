"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { registerAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function RegisterForm() {
  const [error, setError] = useState("");
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setError("");
    const result = await registerAction(data);

    if (result?.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, messages]) => {
        if (!messages?.[0]) return;
        form.setError(field as keyof RegisterInput, {
          type: "server",
          message: messages[0],
        });
      });
    }

    if (result?.error) setError(result.error);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2 text-4xl">SchoolHub</div>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>Join SchoolHub today</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              placeholder="John Smith"
              {...form.register("full_name")}
            />
            {form.formState.errors.full_name && (
              <p className="text-xs text-red-500">
                {form.formState.errors.full_name.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@school.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-xs text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder="********"
              {...form.register("confirm_password")}
            />
            {form.formState.errors.confirm_password && (
              <p className="text-xs text-red-500">
                {form.formState.errors.confirm_password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
