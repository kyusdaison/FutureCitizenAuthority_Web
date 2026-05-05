export const reviewPacketHref = '/fca-review-packet.md';
export const pilotApplicationRoute = '/pilot-application';
export const pilotReviewEmail = 'review@fca.ms';
export const pilotRequestMailtoBase = 'mailto:review@fca.ms';

const conversionEventStorageKey = 'fca:conversion-events';
const maxStoredEvents = 80;

export type ConversionEventName =
  | 'pilot_request_started'
  | 'pilot_application_submitted'
  | 'review_packet_downloaded'
  | 'review_room_opened';

export type PilotApplicationPayload = {
  organization: string;
  organizationType: string;
  contactName: string;
  contactEmail: string;
  workflow: string;
  dataBoundary: string;
  pilotWindow: string;
  notes: string;
};

export type ConversionEvent = {
  id: string;
  name: ConversionEventName;
  source: string;
  path: string;
  createdAt: string;
  metadata?: Record<string, string>;
};

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readStoredEvents = (): ConversionEvent[] => {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(conversionEventStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const readConversionEvents = () => readStoredEvents();

export const trackConversionEvent = (
  name: ConversionEventName,
  source: string,
  metadata?: Record<string, string>
): ConversionEvent | undefined => {
  if (!isBrowser()) return undefined;

  const event: ConversionEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    source,
    path: window.location.pathname,
    createdAt: new Date().toISOString(),
    metadata,
  };

  const events = [event, ...readStoredEvents()].slice(0, maxStoredEvents);
  window.localStorage.setItem(conversionEventStorageKey, JSON.stringify(events));
  window.dispatchEvent(new CustomEvent('fca:conversion', { detail: event }));

  return event;
};

const encode = (value: string) => encodeURIComponent(value.trim());

export const createPilotRequestMailto = (payload: PilotApplicationPayload) => {
  const subject = 'Future Citizen Authority pilot review request';
  const body = [
    'Hello Future Citizen Authority team,',
    '',
    'We would like to request a pilot review.',
    '',
    `Organization: ${payload.organization}`,
    `Organization type: ${payload.organizationType || 'Not specified'}`,
    `Contact: ${payload.contactName}`,
    `Email: ${payload.contactEmail}`,
    `Priority workflow: ${payload.workflow}`,
    `Data that must stay private: ${payload.dataBoundary}`,
    `Target pilot window: ${payload.pilotWindow || 'Not specified'}`,
    '',
    'Additional notes:',
    payload.notes || 'None',
  ].join('\n');

  return `${pilotRequestMailtoBase}?subject=${encode(subject)}&body=${encode(body)}`;
};
