"use client"

import { ComponentWizard } from "@/components/component-wizard";
import { Flochat } from "@flochat/react";

export default function Home() {
  return (
    <main className="app-shell antialiased">
      <ComponentWizard />

      <div>
        <Flochat
          size="md"
          position="bottom-left"
          bottomOffset={32}
          color="blue"
          socialLinks={[
            { platform: 'github', url: 'https://github.com/arewageek', label: 'GitHub' },
            { platform: 'twitter', url: 'https://twitter.com/arewaofweb3', label: 'Twitter' },
          ]}
          showLabels={false}
          animationStyle="grid"
          toggleIcon="share"
          brandColors={false}
        />
      </div>
    </main>
  );
}
