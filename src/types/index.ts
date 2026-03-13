export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "teacher";
  created_at: string;
  updated_at: string;
};
