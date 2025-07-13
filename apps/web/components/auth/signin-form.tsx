"use client";

import { SocialAuthButton } from "@/components/auth/shared/social-auth-button";
import { PasswordInput } from "@/components/auth/shared/password-input";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signInSchema, type SignInFormData } from "@/schemas/index";
import { FieldError } from "@workspace/ui/components/field-error";
import type { ComponentProps, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { useSignIn } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function SignInForm({ className, ...props }: ComponentProps<"div">) {
	const { isLoading, signInWithCredentials, signInWithGoogleProvider } = useSignIn();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
			remember: false,
		},
	});

	const passwordValue = watch("password");

	const onSubmit: SubmitHandler<SignInFormData> = async data => {
		await signInWithCredentials(data);
	};

	return (
		<AuthCard
			title="Welcome back"
			description="Enter your email to sign in to your account"
			navigationType="signin"
			className={className}
			{...props}
		>
			<div className="flex flex-col gap-6">
				<SocialAuthButton provider="google" action="signin" onClick={signInWithGoogleProvider} disabled={isLoading} />

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="space-y-2">
						<Label htmlFor="email" className="text-sm font-medium">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="name@example.com"
							className="bg-background"
							{...register("email")}
							aria-invalid={!!errors.email}
							autoComplete="email"
						/>
						<FieldError error={errors.email?.message} />
					</div>

					<div className="space-y-2">
						<Label htmlFor="password" className="text-sm font-medium">
							Password
						</Label>
						<PasswordInput
							id="password"
							value={passwordValue}
							onChange={(e: ChangeEvent<HTMLInputElement>) => setValue("password", e.target.value)}
							placeholder="Enter your password"
							autoComplete="current-password"
							aria-invalid={!!errors.password}
						/>
						<FieldError error={errors.password?.message} />
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="remember"
								{...register("remember")}
								onCheckedChange={checked => setValue("remember", !!checked)}
							/>
							<Label htmlFor="remember" className="text-sm text-muted-foreground">
								Remember me
							</Label>
						</div>
						<Link
							href="/forgot-password"
							className="text-sm font-medium text-primary hover:text-primary/90 hover:underline"
						>
							Forgot password?
						</Link>
					</div>

					<Button type="submit" className="mt-2 w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Signing in...
							</>
						) : (
							"Sign in"
						)}
					</Button>
				</form>
			</div>
		</AuthCard>
	);
}