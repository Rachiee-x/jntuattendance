import { login } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
    return <AuthForm action={login} />;
}
