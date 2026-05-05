const lastUpdated = '5 May 2026';

const Terms = () => (
  <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-12 lg:px-8">
    <header className="mb-10 border-b border-white/10 pb-8">
      <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Legal</p>
      <h1 className="text-3xl font-serif font-light text-white md:text-5xl">Terms of use</h1>
      <p className="mt-4 text-sm text-slate-400">Last updated: {lastUpdated}</p>
    </header>

    <div className="space-y-10 text-sm leading-[1.85] text-slate-300">
      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Scope</h2>
        <p>
          These terms govern your access to <strong className="text-white">fca.ms</strong>, the institutional
          review site for Future Citizen Authority. They do not cover any pilot or production deployment of
          FCA infrastructure, which is governed by separate written agreements with the responsible public
          authority.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">What this site is</h2>
        <p>
          <strong className="text-white">fca.ms</strong> is a static institutional review surface. It contains
          evaluation material — review packets, identity-layer demonstrations, control surfaces, and
          deployment paths — for procurement, technical, and compliance evaluators on behalf of public
          agencies and regulated institutions.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">What this site is not</h2>
        <ul className="space-y-3 list-none">
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Not a production identity issuance system.</strong> The
            credential demonstration on{' '}
            <code className="font-mono text-xs text-fc-gold">/identity</code> signs ephemeral W3C
            verifiable credentials inside your browser for review purposes only. No real credentials are
            issued, no resident data is collected, no records persist beyond the browser tab.
          </li>
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Not a financial product.</strong> No tokens, no securities, no
            investment instruments are offered, sold, or solicited through this site. References to
            settlement infrastructure refer to the operating layer beneath authorized pilots, not to a
            tradable asset.
          </li>
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Not legal or regulatory advice.</strong> Information here
            describes infrastructure capabilities. The legality of any specific deployment in a specific
            jurisdiction is determined by that jurisdiction's competent authorities and the legal counsel
            retained by the responsible public agency.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Sample / preview content</h2>
        <p>
          Pages or rows marked <em>Sample preview</em>, <em>Representative</em>, or{' '}
          <em>Mixed source</em> use illustrative data. Numbers, transaction references, credential records,
          and operator names on those surfaces are not connected to any real holder, transaction, registry,
          or counterparty.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Intellectual property</h2>
        <p>
          The text, design, and code of this site are © Future Citizen Authority. Open-source components
          (W3C Verifiable Credentials Data Model, the <code className="font-mono text-xs text-fc-gold">@noble</code>{' '}
          cryptographic libraries, React, Vite, Tailwind, and similar) are used under their respective
          licenses. Logos and visual marks are not licensed for re-use.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Acceptable use</h2>
        <ul className="space-y-2 list-disc pl-5 marker:text-fc-gold/60">
          <li>You may freely browse, screenshot, link to, and quote material from this site for institutional review purposes.</li>
          <li>You may not use the site to attempt to issue or claim production credentials.</li>
          <li>You may not scrape or index pages explicitly marked <code className="font-mono text-xs text-fc-gold">noindex</code>.</li>
          <li>You may not represent that any specific pilot or deployment exists unless documented by Future Citizen Authority in writing.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Disclaimer</h2>
        <p>
          This site is provided as-is for institutional review. No warranty is made as to fitness for any
          particular deployment until that deployment has been individually scoped, contracted, and
          authorized in writing. Future Citizen Authority is not liable for procurement, operational, or
          political decisions made on the basis of review-stage material.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Contact</h2>
        <p>
          Legal enquiries:{' '}
          <a href="mailto:legal@fca.ms" className="text-fc-gold underline-offset-4 hover:underline">
            legal@fca.ms
          </a>
          <br />
          Privacy enquiries:{' '}
          <a href="mailto:privacy@fca.ms" className="text-fc-gold underline-offset-4 hover:underline">
            privacy@fca.ms
          </a>
        </p>
      </section>
    </div>
  </div>
);

export default Terms;
