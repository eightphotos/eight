CREATE TABLE "eight_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eight_file_tag" (
	"id" text PRIMARY KEY NOT NULL,
	"file_id" text NOT NULL,
	"tag_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eight_photos" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"metadata" jsonb,
	"embedding" vector(768),
	"search" "tsvector" GENERATED ALWAYS AS (setweight(to_tsvector('simple', coalesce("eight_photos"."description", '')), 'A') || setweight(to_tsvector('simple', coalesce(array_to_string("eight_photos"."metadata"->'tags', ' '), '')), 'B')) STORED NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eight_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "eight_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "eight_tag" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text DEFAULT '#808080' NOT NULL,
	"parent_id" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eight_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "eight_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "eight_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "eight_account" ADD CONSTRAINT "eight_account_user_id_eight_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."eight_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eight_file_tag" ADD CONSTRAINT "eight_file_tag_tag_id_eight_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."eight_tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eight_file_tag" ADD CONSTRAINT "eight_file_tag_user_id_eight_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."eight_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eight_photos" ADD CONSTRAINT "eight_photos_user_id_eight_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."eight_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eight_session" ADD CONSTRAINT "eight_session_user_id_eight_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."eight_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eight_tag" ADD CONSTRAINT "eight_tag_user_id_eight_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."eight_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "photos_embedding_idx" ON "eight_photos" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX "photos_search_idx" ON "eight_photos" USING gin ("search");