ALTER TABLE "eight_photos" drop column "search";--> statement-breakpoint
ALTER TABLE "eight_photos" ADD COLUMN "search" "tsvector" GENERATED ALWAYS AS (
            setweight(to_tsvector('simple', coalesce("eight_photos"."description", '')), 'A') ||
            setweight(
              to_tsvector(
                'simple',
                coalesce(
                  array_to_string(ARRAY(
                    SELECT jsonb_array_elements_text("eight_photos"."metadata"->'tags')
                  ), ' '),
                  ''
                )
              ),
              'B'
            )
          ) STORED NOT NULL;