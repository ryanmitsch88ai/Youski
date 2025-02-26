import { Suspense } from "react";
import ResortFinder from "@/components/resorts/ResortFinder";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <ResortFinder />
      </Suspense>
    </main>
  );
}
