import { Suspense } from "react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <Suspense fallback={<LoadingSpinner />}>
        <OnboardingFlow />
      </Suspense>
    </main>
  );
}
