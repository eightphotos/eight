"use client";

import type { SocialAuthButtonProps } from "@/lib/types";
import { Button } from "@workspace/ui/components/button";
import { Google } from "@/components/icons/google";

const providerConfig = {
	google: {
		icon: Google,
		name: "Google",
	},
} as const;

export function SocialAuthButton({ provider, action, ...props }: SocialAuthButtonProps) {
	const config = providerConfig[provider];
	const IconComponent = config.icon;

	const getActionText = () => {
		return action === "signin" ? `Continue with ${config.name}` : `Continue with ${config.name}`;
	};

	return (
		<Button
			variant="outline"
			type="button"
			className="relative w-full justify-start gap-2 border-muted-foreground/20 bg-background px-8 hover:bg-muted/50 hover:text-accent-foreground"
			{...props}
		>
			<IconComponent className="h-4 w-4" />
			<span className="absolute left-1/2 -translate-x-1/2">{getActionText()}</span>
		</Button>
	);
}