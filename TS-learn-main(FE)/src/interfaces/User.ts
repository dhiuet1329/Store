export interface User {
  email: string;
  password: string;
  id?: number | string;
  confirmPassword: string;
  name: string;
  role?: "admin" | "member";
}
