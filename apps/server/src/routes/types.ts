import type { RateLimiterRedis } from "rate-limiter-flexible";


// Security/Rate Limiting

export interface SecurityOptions {
	rateLimiting?: {
		enabled: boolean;
		rateLimiter: RateLimiterRedis;
	};
	securityHeaders?: boolean;
}