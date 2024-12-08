import LoginForm from "@/components/forms/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return <LoginForm />;
}
