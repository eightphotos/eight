ALTER TABLE "waitlist" RENAME TO "eight_waitlist";--> statement-breakpoint
ALTER TABLE "eight_waitlist" DROP CONSTRAINT "waitlist_email_unique";--> statement-breakpoint
ALTER TABLE "eight_waitlist" ADD CONSTRAINT "eight_waitlist_email_unique" UNIQUE("email");