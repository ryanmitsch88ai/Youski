import { Suspense } from "react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2576&auto=format&fit=crop"
          alt="Scenic mountain ski background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <Suspense fallback={<LoadingSpinner />}>
          <OnboardingFlow />
        </Suspense>
      </div>
    </main>
  );
}
