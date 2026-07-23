"use client";

import { useState } from "react";
import { SocialProfilesModule } from "@/components/social-profiles-module";
import { maraWhitfieldCase } from "@/data";
import { cn } from "@/lib/utils";

export function SocialProfilesGallery() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-16px">
      <div className="space-y-4px">
        <h2 className="text-subheading font-medium text-charcoal">
          Social Profiles & Audience Stats
        </h2>
        <p className="text-body text-steel">
          Mara Whitfield fixtures — Instagram shows credibility + audience type
          in one card; TikTok and X show{" "}
          <span className="font-medium text-charcoal">
            Not available for this platform
          </span>{" "}
          where those fields are omitted.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setLoading((v) => !v)}
        className={cn(
          "rounded-buttons border px-12px py-1.5 text-caption font-medium",
          loading
            ? "border-electric-blue bg-[#dbeaff] text-electric-blue"
            : "border-ash bg-canvas-white text-steel hover:text-charcoal"
        )}
      >
        {loading ? "Loading on" : "Show loading skeleton"}
      </button>

      <div className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle md:p-24px">
        <SocialProfilesModule
          profiles={maraWhitfieldCase.socialProfiles}
          loading={loading}
        />
      </div>
    </div>
  );
}
