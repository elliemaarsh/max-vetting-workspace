"use client";

import { SocialProfilesModule } from "@/components/social-profiles-module";
import { maraWhitfieldCase } from "@/data";

export function SocialProfilesGallery() {
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

      <div className="rounded-cards border border-ash bg-canvas-white p-24px shadow-subtle">
        <SocialProfilesModule profiles={maraWhitfieldCase.socialProfiles} />
      </div>
    </div>
  );
}
