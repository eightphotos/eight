"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientEnv } from "@/lib/env/client-env";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import NumberFlow from "@number-flow/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@workspace/ui/lib/utils";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email. Please check the spelling and try again"),
});

type FormSchema = z.infer<typeof formSchema>;

// API response types
type WaitlistResponse = {
  success: boolean;
  error?: string;
  message?: string;
};

type WaitlistCountResponse = {
  count: number;
  success?: boolean;
  error?: string;
};

// Safe localStorage wrapper
const storage = {
  get: (key: string) => {
    if (typeof document === "undefined") return null;
    try {
      return localStorage?.getItem(key) ?? null;
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      return null;
    }
  },
  set: (key: string, value: string) => {
    if (typeof document === "undefined") return;
    try {
      localStorage?.setItem(key, value);
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    }
  },
};

// API functions for Hono backend
async function getWaitlistCount(): Promise<WaitlistCountResponse> {
  const res = await fetch(
    `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/waitlist/count`,
  );
  if (!res.ok) {
    const errorData = (await res
      .json()
      .catch(() => ({ error: "Failed to get waitlist count" }))) as {
      error: string;
    };
    throw new Error(errorData.error || "Failed to get waitlist count");
  }
  const data = await res.json();
  return data as WaitlistCountResponse;
}

async function joinWaitlist(email: string): Promise<void> {
  const response = await fetch(
    `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/waitlist/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );

  const data = (await response.json()) as WaitlistResponse;

  if (!response.ok || !data.success) {
    if (data.error === "Email already exists in waitlist") {
      throw new Error("You're already on the waitlist!");
    }
    throw new Error(data.error || "Failed to join waitlist");
  }
}

const COUNT_STORAGE_KEY = "waitlist_count";
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

function useWaitlistCount() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["waitlist", "count"],
    queryFn: async () => {
      // Try to get cached data from localStorage
      const cachedData = storage.get(COUNT_STORAGE_KEY);
      if (cachedData) {
        try {
          const { count, timestamp } = JSON.parse(cachedData) as {
            count: number;
            timestamp: number;
          };
          const isExpired = Date.now() - timestamp > CACHE_DURATION;

          // If cache is still valid, return the cached count
          if (!isExpired) {
            return { count };
          }
        } catch (e) {
          // If there's an error parsing the cache, continue to fetch fresh data
          console.error("Error parsing waitlist cache:", e);
        }
      }

      // If no cache or cache is expired, fetch fresh data
      const data = await getWaitlistCount();

      // set localStorage with fresh data
      storage.set(
        COUNT_STORAGE_KEY,
        JSON.stringify({
          count: data.count,
          timestamp: Date.now(),
        }),
      );

      return data;
    },
    staleTime: CACHE_DURATION, // Mark as stale after cache duration
    gcTime: CACHE_DURATION * 2, // Keep in cache for double the duration
  });

  const mutation = useMutation({
    mutationFn: (email: string) => joinWaitlist(email),
    onSuccess: () => {
      toast.success(
        "Welcome to the waitlist! 🎉 We'll let you know when we're ready to show you what we've been working on.",
      );

      const newCount = (query.data?.count ?? 0) + 1;
      queryClient.setQueryData(["waitlist", "count"], { count: newCount });
      // set localStorage with the new count
      storage.set(
        COUNT_STORAGE_KEY,
        JSON.stringify({
          count: newCount,
          timestamp: Date.now(),
        }),
      );
    },
    onError: (error) => {
      // Enhanced error logging for development
      console.error("Waitlist join error:", error);
      
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    },
  });

  return { 
    count: query.data?.count ?? 0, 
    mutate: mutation.mutate,
    isLoading: query.isLoading,
    isSubmitting: mutation.isPending,
    isError: query.isError || mutation.isError,
  };
}

interface WaitlistFormProps {
  className?: string;
}

export function WaitlistForm({ className }: WaitlistFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const waitlist = useWaitlistCount();
  const [hasJoined, setHasJoined] = useState(false);

  function handleJoinWaitlist({ email }: FormSchema) {
    waitlist.mutate(email, {
      onSuccess: () => {
        reset(); 
        setHasJoined(true);
      },
    });
  }

  return (
    <div className={cn("mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4", className)}>
      <form
        className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row"
        onSubmit={handleSubmit(handleJoinWaitlist, (errors) => {
          if (errors.email) {
            toast.error(errors.email.message);
          }
        })}
      >
        <Input
          type="email"
          placeholder="example@0.email"
          className={cn(
            "placeholder:text-muted-foreground h-11 w-full rounded-lg bg-white/50 px-4 text-base font-medium outline outline-neutral-200 backdrop-blur-3xl placeholder:font-medium md:text-base dark:bg-black/50",
            errors.email && "border-red-500 focus:border-red-500"
          )}
          disabled={waitlist.isSubmitting || hasJoined}
          {...register("email")}
        />
        
        <Button
          type="submit"
          disabled={waitlist.isSubmitting || hasJoined}
          className={cn(
            "relative h-11 w-full cursor-pointer overflow-hidden rounded-lg pr-3 pl-4 text-base drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-all duration-300 before:absolute before:inset-0 before:translate-x-[-100%] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-transform before:duration-1000 before:ease-in-out hover:drop-shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:before:translate-x-[100%] sm:w-fit dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]",
            hasJoined && "bg-green-600 hover:bg-green-700"
          )}
        >
          {waitlist.isSubmitting ? (
            "Joining"
          ) : hasJoined ? (
            "Joined"
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </form>
      
      <div className="relative mt-3 flex flex-row items-center justify-center gap-3 text-sm sm:text-base">
        <span className="size-2 animate-pulse rounded-full bg-green-600 dark:bg-green-400" />
        <span className="absolute left-0 size-2 animate-pulse rounded-full bg-green-600 blur-xs dark:bg-green-400" />
        <span className="text-gray-900 dark:text-white">
          {waitlist.isLoading ? (
            "Loading count..."
          ) : (
            <>
              <NumberFlow value={waitlist.count} /> people already joined the waitlist
            </>
          )}
        </span>
      </div>
    </div>
  );
}
