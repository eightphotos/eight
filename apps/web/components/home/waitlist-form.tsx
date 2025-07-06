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
    .email("Invalid email. Please check the spelling and try again"),
});

type FormSchema = z.infer<typeof formSchema>;

// API response types
type WaitlistResponse = {
  success: boolean;
  error?: string;
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
    if (data.error === "Email already exists") {
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

  const { mutate } = useMutation({
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    },
  });

  return { count: query.data?.count ?? 0, mutate };
}

interface WaitlistFormProps {
  className?: string;
}

export function WaitlistForm({ className }: WaitlistFormProps) {
  const { register, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const waitlist = useWaitlistCount();

  function handleJoinWaitlist({ email }: FormSchema) {
    waitlist.mutate(email);
    reset();
  }

  return (
    <div className={cn("max-w-lg mx-auto", className)}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleJoinWaitlist, (errors) => {
          if (errors.email) {
            toast.error(errors.email.message);
          }
        })}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="example@0.email"
              className="h-12 px-6 text-base backdrop-blur-sm transition-all duration-300 bg-white/50"
              {...register("email")}
            />
          </div>

          <Button
            type="submit"
            className="h-12 px-8 font-semibold transition-all duration-300 relative overflow-hidden active:scale-95 text-white shadow-lg hover:shadow-xl sm:w-auto w-full bg-gray-900 hover:bg-gray-800"
          >
            Join Waitlist
          </Button>
        </div>
      </form>
      <div className="flex items-center justify-center gap-3 pt-4 text-gray-900">
        <div className="relative">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
        </div>
        <span className="text-sm">
          <NumberFlow value={waitlist.count} /> people already joined the
          waitlist
        </span>
      </div>
    </div>
  );
}
