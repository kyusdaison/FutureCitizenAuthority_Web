const lastUpdated = '5 May 2026';

const Privacy = () => (
  <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-12 lg:px-8">
    <header className="mb-10 border-b border-white/10 pb-8">
      <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Legal</p>
      <h1 className="text-3xl font-serif font-light text-white md:text-5xl">Privacy policy</h1>
      <p className="mt-4 text-sm text-slate-400">Last updated: {lastUpdated}</p>
    </header>

    <div className="space-y-10 text-sm leading-[1.85] text-slate-300">
      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Scope</h2>
        <p>
          This policy covers <strong className="text-white">fca.ms</strong>, the institutional review site for
          Future Citizen Authority. It does not cover any pilot or production deployment of FCA infrastructure
          for a specific public agency — those deployments operate under the data-protection law of the
          responsible jurisdiction and are documented in a separate written agreement.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">What this site collects</h2>
        <ul className="space-y-3 list-none">
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Server logs.</strong> Standard HTTP request metadata: IP address,
            user agent, referrer, request path, timestamp. Retained for 30 days for security and abuse
            mitigation. Not used for marketing, behavioural profiling, or onward disclosure.
          </li>
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Email correspondence.</strong> If you contact one of the
            published mailboxes (e.g. <code className="font-mono text-xs text-fc-gold">pilots@fca.ms</code>,{' '}
            <code className="font-mono text-xs text-fc-gold">review@fca.ms</code>,{' '}
            <code className="font-mono text-xs text-fc-gold">privacy@fca.ms</code>), your email address and
            message body are routed to a named person on the FCA team. Retained for the lifetime of the
            review or pilot conversation.
          </li>
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Browser-local review state.</strong> The site uses{' '}
            <code className="font-mono text-xs text-fc-gold">localStorage</code> for non-sensitive local
            preferences and review diagnostics, including low-power mode and the{' '}
            <code className="font-mono text-xs text-fc-gold">fca:conversion-events</code> log used to
            show whether a visitor opened the pilot request flow, downloaded the packet, or drafted a
            pilot email. These events remain in your browser and are not transmitted by this static site.
          </li>
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">In-browser identity demo state.</strong> The W3C credential demo
            on <code className="font-mono text-xs text-fc-gold">/identity</code> generates an ephemeral
            Ed25519 keypair and demonstration credential entirely inside your browser. Nothing leaves your
            device. The keypair is discarded when you close the tab.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">What this site does not collect</h2>
        <ul className="space-y-2 list-disc pl-5 marker:text-fc-gold/60">
          <li>No third-party analytics. No Google Analytics, no Facebook Pixel, no Mixpanel, no LinkedIn Insight, no behavioural advertising trackers.</li>
          <li>No cookies. The site sets no cookies of its own.</li>
          <li>No browser fingerprinting.</li>
          <li>No biometric or biographical identification data.</li>
          <li>No location data beyond what is implicit in the IP address.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Why this matters</h2>
        <p>
          Future Citizen Authority is being evaluated by public agencies. A site selling identity
          infrastructure that itself silently collects visitor data on third-party platforms would be a
          credibility failure. The same minimisation posture we recommend for production deployments is
          applied here.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Your rights</h2>
        <p className="mb-3">
          Depending on your jurisdiction (GDPR, UK GDPR, CCPA, LGPD, PDPA, or similar), you may have rights
          including:
        </p>
        <ul className="space-y-2 list-disc pl-5 marker:text-fc-gold/60">
          <li>Right to access personal data we hold about you</li>
          <li>Right to request correction or erasure</li>
          <li>Right to restrict or object to processing</li>
          <li>Right to data portability</li>
          <li>Right to lodge a complaint with your local supervisory authority</li>
        </ul>
        <p className="mt-4">
          To exercise any of the above, write to{' '}
          <a
            href="mailto:privacy@fca.ms?subject=Data%20subject%20request"
            className="text-fc-gold underline-offset-4 hover:underline"
          >
            privacy@fca.ms
          </a>
          . We aim to respond within 30 days.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Contact</h2>
        <p>
          Privacy enquiries:{' '}
          <a
            href="mailto:privacy@fca.ms"
            className="text-fc-gold underline-offset-4 hover:underline"
          >
            privacy@fca.ms
          </a>
          <br />
          Legal enquiries:{' '}
          <a
            href="mailto:legal@fca.ms"
            className="text-fc-gold underline-offset-4 hover:underline"
          >
            legal@fca.ms
          </a>
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Changes</h2>
        <p>
          This policy may be revised. The <em>last updated</em> date at the top of this page reflects the
          most recent revision. Material changes affecting how visitor data is handled will be flagged in
          the page header for at least 30 days.
        </p>
      </section>
    </div>
  </div>
);

export default Privacy;
