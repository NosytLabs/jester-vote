"use client";

import { motion } from "framer-motion";

/**
 * Skeleton pulse animation for loading states
 */
export function SkeletonPulse({ className = "", customStyle }: { className?: string; customStyle?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse bg-muted ${className}`}
      style={{ backgroundColor: "oklch(0.22 0 0)", ...customStyle }}
    />
  );
}

/**
 * Card skeleton with jester theme
 */
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`jester-border-subtle p-4 ${className}`}>
      <SkeletonPulse className="h-4 w-1/3 mb-3 rounded" />
      <SkeletonPulse className="h-3 w-full mb-2 rounded" />
      <SkeletonPulse className="h-3 w-2/3 rounded" />
    </div>
  );
}

/**
 * Nominee page skeleton
 */
export function NomineePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="border-b border-border p-4">
        <div className="container flex items-center justify-between">
          <SkeletonPulse className="h-8 w-32 rounded" />
          <SkeletonPulse className="h-8 w-24 rounded" />
        </div>
      </div>

      <main className="container py-4 sm:py-6">
        {/* Back button skeleton */}
        <SkeletonPulse className="h-4 w-24 mb-4 rounded" />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left column - Main profile */}
          <div className="lg:col-span-2 space-y-4">
            {/* Profile card */}
            <div className="jester-card p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Avatar skeleton */}
                <SkeletonPulse className="w-24 h-24 sm:w-32 sm:h-32 rounded shrink-0 mx-auto sm:mx-0" />

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  {/* Name skeleton */}
                  <SkeletonPulse className="h-8 w-48 mb-2 rounded mx-auto sm:mx-0" />
                  {/* Description skeleton */}
                  <SkeletonPulse className="h-4 w-full mb-2 rounded" />
                  <SkeletonPulse className="h-4 w-2/3 mb-4 rounded mx-auto sm:mx-0" />

                  {/* Vote buttons skeleton */}
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <SkeletonPulse className="h-10 w-20 rounded" />
                    <SkeletonPulse className="h-10 w-20 rounded" />
                    <SkeletonPulse className="h-10 w-24 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats section */}
            <div className="jester-card p-4">
              <SkeletonPulse className="h-6 w-32 mb-4 rounded" />
              <div className="h-48 bg-muted/50 rounded flex items-end justify-around p-4">
                {[...Array(7)].map((_, i) => (
                  <SkeletonPulse
                    key={i}
                    className="w-8 rounded-t"
                    customStyle={{ height: `${20 + Math.random() * 60}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Comments section */}
            <div className="jester-card p-4">
              <SkeletonPulse className="h-6 w-40 mb-4 rounded" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <SkeletonPulse className="w-8 h-8 rounded-full shrink-0" />
                    <div className="flex-1">
                      <SkeletonPulse className="h-3 w-24 mb-2 rounded" />
                      <SkeletonPulse className="h-3 w-full rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Sidebar */}
          <div className="space-y-4">
            {/* Live status skeleton */}
            <CardSkeleton />

            {/* Notable moments skeleton */}
            <CardSkeleton />

            {/* External links skeleton */}
            <CardSkeleton />
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Leaderboard skeleton
 */
export function LeaderboardSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-1 sm:space-y-2">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="jester-border-subtle p-3 sm:p-4 flex items-center gap-3"
        >
          {/* Rank */}
          <SkeletonPulse className="w-8 h-8 rounded shrink-0" />

          {/* Avatar */}
          <SkeletonPulse className="w-10 h-10 sm:w-12 sm:h-12 rounded shrink-0" />

          {/* Name + description */}
          <div className="flex-1 min-w-0">
            <SkeletonPulse className="h-4 w-32 mb-1 rounded" />
            <SkeletonPulse className="h-3 w-48 rounded hidden sm:block" />
          </div>

          {/* Score */}
          <SkeletonPulse className="h-6 w-16 rounded hidden sm:block" />

          {/* Vote buttons */}
          <div className="flex gap-1">
            <SkeletonPulse className="h-8 w-14 rounded" />
            <SkeletonPulse className="h-8 w-14 rounded" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Home page skeleton
 */
export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="border-b border-border p-4">
        <div className="container flex items-center justify-between">
          <SkeletonPulse className="h-8 w-32 rounded" />
          <div className="flex gap-2">
            <SkeletonPulse className="h-8 w-20 rounded" />
            <SkeletonPulse className="h-8 w-8 rounded" />
          </div>
        </div>
      </div>

      <main className="container py-4 sm:py-6">
        {/* Hero section */}
        <div className="jester-card p-6 mb-6 text-center">
          <SkeletonPulse className="h-10 w-64 mb-2 rounded mx-auto" />
          <SkeletonPulse className="h-4 w-96 rounded mx-auto" />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="jester-card p-3 text-center">
              <SkeletonPulse className="h-6 w-12 rounded mx-auto mb-1" />
              <SkeletonPulse className="h-3 w-20 rounded mx-auto" />
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <LeaderboardSkeleton count={10} />
      </main>
    </div>
  );
}

/**
 * Submit page skeleton
 */
export function SubmitPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="container flex items-center justify-between">
          <SkeletonPulse className="h-8 w-32 rounded" />
          <SkeletonPulse className="h-8 w-24 rounded" />
        </div>
      </div>

      <main className="container py-6 max-w-2xl">
        <div className="jester-card p-6">
          <SkeletonPulse className="h-8 w-48 mb-6 rounded" />

          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <SkeletonPulse className="h-4 w-24 mb-2 rounded" />
              <SkeletonPulse className="h-10 w-full rounded" />
            </div>

            <div>
              <SkeletonPulse className="h-4 w-32 mb-2 rounded" />
              <SkeletonPulse className="h-24 w-full rounded" />
            </div>

            <div>
              <SkeletonPulse className="h-4 w-28 mb-2 rounded" />
              <SkeletonPulse className="h-10 w-full rounded" />
            </div>

            <SkeletonPulse className="h-12 w-full rounded mt-6" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default SkeletonPulse;
