"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@workspace/ui/components/card";
import { ArrowLeft } from "lucide-react";
import type { AuthCardProps } from "@/lib/types";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

export function AuthCard({ title, description, navigationType, children, className, ...props }: AuthCardProps) {
	const oppositeAction = navigationType === "signin" ? "signup" : "signin";
	const oppositeActionText = navigationType === "signin" ? "Sign up" : "Sign in";

	return (
		<div className={cn("flex size-full flex-col items-center justify-center gap-0 select-none px-4", className)} {...props}>
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-4">
					<div className="-mx-6 -mt-6 flex flex-row items-center justify-between border-b bg-muted/40">
						<Button className="rounded-none px-6 py-6 font-medium transition-colors" variant="ghost" asChild>
							<Link href="/" className="flex items-center gap-2">
								<ArrowLeft className="h-4 w-4" />
								Back
							</Link>
						</Button>
						<Button className="rounded-none px-6 py-6 font-medium transition-colors" variant="ghost" asChild>
							<Link href={`/${oppositeAction}`}>
								{oppositeActionText}
							</Link>
						</Button>
					</div>
					<div className="text-center">
						<CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
						<CardDescription className="mt-2 text-sm text-muted-foreground">{description}</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="p-6">{children}</CardContent>

				<CardFooter className="flex flex-col border-t bg-muted/40 p-6">
					<p className="text-center text-sm text-muted-foreground">
						By {navigationType === "signin" ? "signing in" : "signing up"}, you agree to our{" "}
						<Link href="/terms" className="font-medium underline underline-offset-4 hover:text-primary">
							terms of service
						</Link>
						.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}