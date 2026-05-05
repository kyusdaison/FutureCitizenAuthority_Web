import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Send, ShieldCheck, TimerReset } from 'lucide-react';
import { DataSourceBadge } from '../components/DataSourceBadge';
import {
  createPilotRequestMailto,
  readConversionEvents,
  reviewPacketHref,
  trackConversionEvent,
  type PilotApplicationPayload,
  type ConversionEvent,
} from '../lib/conversion';
import { useToast } from '../contexts/ToastContext';

const initialForm: PilotApplicationPayload = {
  organization: '',
  organizationType: '',
  contactName: '',
  contactEmail: '',
  workflow: '',
  dataBoundary: '',
  pilotWindow: '',
  notes: '',
};

const reviewChecklist = [
  'One accountable owner',
  'One priority workflow',
  'Private data boundary',
  'Approval roles',
  '60-90 day review window',
];

const eventLabels: Record<string, string> = {
  pilot_request_started: 'Request opened',
  pilot_application_submitted: 'Application drafted',
  review_packet_downloaded: 'Packet downloaded',
  review_room_opened: 'Review room opened',
};

const fieldClass =
  'w-full border border-white/10 bg-[#020617]/80 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-fc-gold/45 focus:bg-[#020617]';

const PilotApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [events, setEvents] = useState<ConversionEvent[]>(() => readConversionEvents().slice(0, 5));

  useEffect(() => {
    const handleConversionEvent = () => {
      setEvents(readConversionEvents().slice(0, 5));
    };

    window.addEventListener('fca:conversion', handleConversionEvent);
    return () => window.removeEventListener('fca:conversion', handleConversionEvent);
  }, []);

  const completionScore = useMemo(() => {
    const requiredFields = [form.organization, form.contactEmail, form.workflow, form.dataBoundary];
    return requiredFields.filter((value) => value.trim().length > 0).length;
  }, [form]);

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mailto = createPilotRequestMailto(form);
    trackConversionEvent('pilot_application_submitted', 'pilot-application-form', {
      workflow: form.workflow,
      organizationType: form.organizationType || 'unspecified',
      pilotWindow: form.pilotWindow || 'unspecified',
    });
    setEvents(readConversionEvents().slice(0, 5));
    setSubmitted(true);
    toast({ message: 'Pilot review draft prepared', type: 'success' });
    window.location.href = mailto;
  };

  const downloadPacket = () => {
    trackConversionEvent('review_packet_downloaded', 'pilot-application');
    setEvents(readConversionEvents().slice(0, 5));
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-20 lg:px-8">
      <section className="mt-4 border border-fc-gold/20 bg-fc-gold/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300">
        <DataSourceBadge kind="representative" label="Pilot intake" className="mr-3 align-middle" />
        <span className="mx-3 text-slate-600">/</span>
        Representative intake flow for routing a first pilot conversation. Submitted details open as
        an email draft so no production system receives data before a formal review channel is approved.
      </section>

      <header className="grid grid-cols-1 gap-8 border-b border-white/10 pb-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-end">
        <div>
          <button
            type="button"
            onClick={() => navigate('/review-room')}
            className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-fc-gold" />
            Back to Review Room
          </button>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-fc-gold">Pilot application</p>
          <h1 className="max-w-4xl text-4xl font-serif font-light leading-tight text-white md:text-6xl">
            Request Pilot Review
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-[1.85] text-slate-400">
            Capture the minimum decision context: who owns the pilot, which workflow matters first,
            what data must stay private, and when the review window should run.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={reviewPacketHref}
              download
              onClick={downloadPacket}
              className="inline-flex items-center justify-between border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-slate-200 transition-colors hover:border-fc-gold/35 hover:text-white"
            >
              <span>Download review packet</span>
              <Download className="h-4 w-4 text-fc-gold" />
            </a>
            <a
              href="mailto:review@fca.ms"
              className="inline-flex items-center justify-between border border-cyan-300/20 bg-cyan-300/[0.035] px-5 py-4 text-sm text-cyan-100 transition-colors hover:border-cyan-300/45 hover:bg-cyan-300/[0.07]"
            >
              <span>review@fca.ms</span>
              <Mail className="h-4 w-4 text-cyan-300" />
            </a>
          </div>
        </div>

        <aside className="border border-white/10 bg-[#020617]/70 p-6">
          <div className="mb-5 flex items-center gap-3 text-white">
            <ShieldCheck className="h-5 w-5 text-fc-gold" />
            <h2 className="text-2xl font-serif font-light">Intake readiness</h2>
          </div>
          <div className="mb-6 h-2 border border-white/10 bg-white/[0.02]">
            <div
              className="h-full bg-fc-gold transition-all duration-500"
              style={{ width: `${Math.max(12, completionScore * 25)}%` }}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reviewChecklist.map((item, index) => (
              <div key={item} className="border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-2 text-[10px] font-mono text-fc-gold/80">0{index + 1}</div>
                <p className="text-sm leading-relaxed text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </header>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={submitApplication} className="border border-white/10 bg-[#020617]/75 p-6 md:p-8">
          <div className="mb-7 flex items-center justify-between gap-5">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Application draft</p>
              <h2 className="text-3xl font-serif font-light text-white">Pilot review details</h2>
            </div>
            <Send className="hidden h-5 w-5 text-cyan-300 md:block" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Organization</span>
              <input
                name="organization"
                value={form.organization}
                onChange={updateField}
                required
                className={fieldClass}
                placeholder="Agency or institution"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Organization type</span>
              <select name="organizationType" value={form.organizationType} onChange={updateField} className={fieldClass}>
                <option value="">Select type</option>
                <option value="Government program">Government program</option>
                <option value="Financial institution">Financial institution</option>
                <option value="Infrastructure partner">Infrastructure partner</option>
                <option value="Civic technology team">Civic technology team</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Contact name</span>
              <input
                name="contactName"
                value={form.contactName}
                onChange={updateField}
                className={fieldClass}
                placeholder="Review owner"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Contact email</span>
              <input
                name="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={updateField}
                required
                className={fieldClass}
                placeholder="name@example.org"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Priority workflow</span>
              <input
                name="workflow"
                value={form.workflow}
                onChange={updateField}
                required
                className={fieldClass}
                placeholder="Identity issuance, benefit routing, treasury approval, wallet recovery..."
              />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Data boundary</span>
              <textarea
                name="dataBoundary"
                value={form.dataBoundary}
                onChange={updateField}
                required
                rows={4}
                className={`${fieldClass} resize-y`}
                placeholder="What raw records, private identifiers, or approval data must stay inside approved systems?"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Target pilot window</span>
              <select name="pilotWindow" value={form.pilotWindow} onChange={updateField} className={fieldClass}>
                <option value="">Select window</option>
                <option value="0-30 days">0-30 days</option>
                <option value="31-60 days">31-60 days</option>
                <option value="61-90 days">61-90 days</option>
                <option value="Planning only">Planning only</option>
              </select>
            </label>
            <label className="block md:col-span-2 xl:col-span-1">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Notes</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={updateField}
                rows={4}
                className={`${fieldClass} resize-y`}
                placeholder="Procurement, security, policy, or integration context"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-between border border-fc-gold/35 bg-fc-gold/[0.08] px-5 py-4 text-sm font-medium text-fc-gold transition-colors hover:border-fc-gold/60 hover:bg-fc-gold/[0.14]"
          >
            <span>{submitted ? 'Prepare another email draft' : 'Submit pilot application'}</span>
            <Send className="h-4 w-4" />
          </button>
        </form>

        <aside className="grid grid-cols-1 gap-6">
          <div className="border border-white/10 bg-[#020617]/70 p-6">
            <div className="mb-5 flex items-center gap-3 text-white">
              <TimerReset className="h-5 w-5 text-cyan-300" />
              <h2 className="text-2xl font-serif font-light">Local conversion log</h2>
            </div>
            <div className="space-y-3">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="border border-white/10 bg-white/[0.02] p-4">
                    <p className="mb-2 text-sm font-medium text-white">{eventLabels[event.name] ?? event.name}</p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {event.source} · {new Date(event.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-slate-500">
                  Conversion events appear here after a request starts, packet downloads, or a draft is submitted.
                </p>
              )}
            </div>
          </div>

          <div className="border border-cyan-300/15 bg-cyan-300/[0.035] p-6">
            <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-cyan-300">Privacy posture</p>
            <p className="text-sm leading-relaxed text-slate-300">
              The local log stores event type, source, path, and non-sensitive routing metadata. The application
              details stay inside the email draft until a reviewer sends it.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default PilotApplication;
