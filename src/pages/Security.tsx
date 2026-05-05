const lastUpdated = '5 May 2026';

const controlAreas = [
  {
    title: 'Demo boundary',
    copy: 'Browser demos use representative data and local state. They do not issue production credentials, connect to resident records, or approve real transactions.',
  },
  {
    title: 'Data minimization',
    copy: 'Pilot-review flows ask for only the owner, workflow, data boundary, approval roles, and target window needed to scope a first conversation.',
  },
  {
    title: 'Identity and access',
    copy: 'Production pilots should define issuer authority, operator roles, credential schema, revocation path, recovery policy, and reviewer access before launch.',
  },
  {
    title: 'Evidence and audit',
    copy: 'Sensitive pilot actions should leave an attributable evidence record: requester, approver, timestamp, approval rule, exception state, and export path.',
  },
];

const Security = () => (
  <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-12 lg:px-8">
    <header className="mb-10 border-b border-white/10 pb-8">
      <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Trust center</p>
      <h1 className="text-3xl font-serif font-light text-white md:text-5xl">Security posture</h1>
      <p className="mt-4 text-sm text-slate-400">Last updated: {lastUpdated}</p>
      <p className="mt-5 max-w-3xl text-sm leading-[1.85] text-slate-300">
        This page explains the security posture of the public review site and the controls that should be
        agreed before a Future Citizen Authority pilot is connected to production data or partner systems.
      </p>
    </header>

    <div className="space-y-10 text-sm leading-[1.85] text-slate-300">
      <section>
        <h2 className="mb-4 text-lg font-serif font-light text-white">Current site boundary</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {controlAreas.map((area) => (
            <article key={area.title} className="border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-3 text-base font-medium text-white">{area.title}</h3>
              <p className="text-slate-400">{area.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Pilot controls</h2>
        <p className="mb-4">
          A production pilot should not be authorized until the responsible authority has reviewed and
          accepted the following control files:
        </p>
        <ul className="space-y-3 list-none">
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Identity control file.</strong> Issuer authority, schema,
            eligibility checks, proof disclosure rules, revocation process, and holder lifecycle.
          </li>
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Custody and recovery file.</strong> Signing roles, recovery
            council, device-change procedure, operator limits, and emergency pause authority.
          </li>
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Approval matrix.</strong> Action class, requester, approver,
            quorum rule, audit event, exception handling, and post-action review path.
          </li>
          <li className="border border-white/10 bg-white/[0.02] p-4">
            <strong className="text-white">Data boundary note.</strong> Raw records, proof outputs,
            public references, retention expectations, access logs, and export restrictions.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Vulnerability reporting</h2>
        <p className="mb-4">
          If you believe you have found a security issue in the review site, identity demo, or any public
          FCA surface, please report it privately before publishing details.
        </p>
        <div className="border border-fc-gold/20 bg-fc-gold/[0.035] p-5">
          <p>
            Security contact:{' '}
            <a href="mailto:security@fca.ms" className="text-fc-gold underline-offset-4 hover:underline">
              security@fca.ms
            </a>
          </p>
          <p className="mt-3 text-slate-400">
            Include the affected URL, reproduction steps, expected impact, browser and operating system,
            and whether any data was accessed. Do not include private keys, credentials, or third-party
            personal data in the initial report.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-serif font-light text-white">Important limitation</h2>
        <p>
          This public page is not a replacement for a partner-specific security assessment, penetration
          test, data-protection impact assessment, or production operating agreement. Those artifacts
          must be scoped with the responsible authority before a real deployment.
        </p>
      </section>
    </div>
  </div>
);

export default Security;
