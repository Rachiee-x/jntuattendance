import { signup } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() {
    return <AuthForm action={signup} isSignup />;
}
