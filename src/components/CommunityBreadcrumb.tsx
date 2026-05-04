import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Breadcrumb shown on the 8 community-zone routes (tokenomics, staking,
 * bridge, swap, artifacts, oracle, whisper, sentinel). Rendered above
 * the page content in App.tsx based on currentView.
 *
 * Cyan accent matches the Community index page banner (vs gold for
 * institutional surfaces). Reinforces that the visitor is in the
 * community zone, not the institutional pitch, and gives a one-click
 * exit back to /community.
 */
export const CommunityBreadcrumb = () => {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Community breadcrumb"
      className="border-b border-white/5 bg-cyan-300/[0.025] px-4 lg:px-8 py-3"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => navigate('/community')}
          className="group inline-flex items-center gap-2 self-start text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-300/90 transition-colors hover:text-cyan-200"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Community</span>
        </button>
        <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-cyan-300/60 self-start sm:self-end">
          Community surface · Sample preview
        </span>
      </div>
    </nav>
  );
};

export default CommunityBreadcrumb;
