"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@workspace/ui/components/card";
import { useSignUp, useCheckEmailExists, useGoogleAuth } from "@/hooks/useAuth";
import { SocialAuthButton } from "@/components/auth/shared/social-auth-button";
import { SegmentedProgress } from "@workspace/ui/components/segmented-progress";
import { ArrowLeft, Eye, EyeClosed, Loader2 } from "lucide-react";
import { signUpSchema, type SignUpFormData } from "@/schemas/index";
import { FieldError } from "@workspace/ui/components/field-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ComponentProps } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { useForm } from "react-hook-form";
import { cn } from "@workspace/ui/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
	const searchParams = useSearchParams();
	const urlEmail = searchParams.get("email");
	const [showPasswordAndTos, setShowPasswordAndTos] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const { isLoading, signUpWithCredentials } = useSignUp();
	const { signInWithGoogleProvider } = useGoogleAuth();
	const checkEmailMutation = useCheckEmailExists();

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		getValues,
		setError,
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: urlEmail ?? "",
			firstName: "",
			lastName: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handleContinue = async () => {
		const isValid = await trigger(["firstName", "lastName", "email"]);
		if (isValid) {
			const email = getValues("email");

			checkEmailMutation.mutate(email, {
				onSuccess: data => {
					if (data.exists) {
						setError("email", {
							type: "manual",
							message: "An account with this email already exists. Please sign in instead.",
						});
						toast.error("An account with this email already exists. Please sign in instead.");
					} else {
						setShowPasswordAndTos(true);
					}
				},
				onError: () => {
					toast.error("Failed to verify email. Please try again.");
				},
			});
		}
	};

	const handleGoBack = () => {
		setShowPasswordAndTos(false);
	};

	const onSubmit = async (data: SignUpFormData) => {
		await signUpWithCredentials(data);
	};

	return (
		<div className={cn("flex size-full flex-col items-center justify-center gap-0 select-none px-4", className)} {...props}>
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-4">
					<div className="-mx-6 -mt-6 flex flex-row items-center justify-start border-b bg-muted/40">
						<Button className="rounded-none px-6 py-6 font-medium transition-colors" variant="ghost" asChild>
							<Link href="/signin" className="flex items-center gap-2">
								<ArrowLeft className="h-4 w-4" />
								Sign in
							</Link>
						</Button>
					</div>
					<SegmentedProgress segments={2} value={showPasswordAndTos ? 2 : 1} className="mx-auto w-full max-w-[240px]" />
					<div className="text-center">
						<CardTitle className="text-2xl font-semibold tracking-tight">
							{!showPasswordAndTos ? "Create an account" : "Secure your account"}
						</CardTitle>
						<CardDescription className="mt-2 text-sm text-muted-foreground">
							{!showPasswordAndTos ? "Enter your details to get started" : "Choose a strong password to protect your account"}
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="p-6">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
						{!showPasswordAndTos && (
							<>
								<SocialAuthButton
									provider="google"
									action="signup"
									onClick={signInWithGoogleProvider}
									disabled={isLoading}
								/>

								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t" />
									</div>
									<div className="relative flex justify-center text-xs uppercase">
										<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="firstName" className="text-sm font-medium">
											First name
										</Label>
										<Input
											id="firstName"
											placeholder="John"
											className="bg-background"
											{...register("firstName")}
											aria-invalid={!!errors.firstName}
										/>
										<FieldError error={errors.firstName?.message} />
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName" className="text-sm font-medium">
											Last name
										</Label>
										<Input
											id="lastName"
											placeholder="Doe"
											className="bg-background"
											{...register("lastName")}
											aria-invalid={!!errors.lastName}
										/>
										<FieldError error={errors.lastName?.message} />
									</div>
								</div>

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
									/>
									<FieldError error={errors.email?.message} />
								</div>

								<Button
									type="button"
									className="w-full"
									onClick={handleContinue}
									disabled={isLoading || checkEmailMutation.isPending}
								>
									{checkEmailMutation.isPending ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Checking email...
										</>
									) : isLoading ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										"Continue"
									)}
								</Button>
							</>
						)}

						{showPasswordAndTos && (
							<>
								<div className="flex flex-col gap-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label htmlFor="password" className="text-sm font-medium">
												Password
											</Label>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												onClick={() => setIsPasswordVisible(!isPasswordVisible)}
												className="h-8 w-8"
											>
												{isPasswordVisible ? (
													<EyeClosed className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</Button>
										</div>
										<Input
											id="password"
											type={isPasswordVisible ? "text" : "password"}
											className="bg-background pr-10"
											placeholder="Create a password"
											{...register("password")}
											aria-invalid={!!errors.password}
										/>
										<FieldError error={errors.password?.message} />
									</div>

									<div className="space-y-2">
										<Label htmlFor="confirmPassword" className="text-sm font-medium">
											Confirm Password
										</Label>
										<Input
											id="confirmPassword"
											type={isPasswordVisible ? "text" : "password"}
											className="bg-background"
											placeholder="Confirm your password"
											{...register("confirmPassword")}
											aria-invalid={!!errors.confirmPassword}
										/>
										<FieldError error={errors.confirmPassword?.message} />
									</div>

									<div className="mt-2 flex gap-4">
										<Button type="button" variant="outline" onClick={handleGoBack} disabled={isLoading}>
											<ArrowLeft className="mr-2 h-4 w-4" />
											Back
										</Button>
										<Button type="submit" className="flex-1" disabled={isLoading}>
											{isLoading ? (
												<Loader2 className="h-4 w-4 animate-spin" />
											) : (
												"Create Account"
											)}
										</Button>
									</div>
								</div>
							</>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}