import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot?: string;
  label?: string;
}

// AdSense-ready slot. Before approval (no client ID) it renders a neutral
// placeholder that holds layout space (prevents CLS) without ad requests.
export const AdSlot = ({ slot = 'auto', label = 'Advertisement' }: AdSlotProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const client = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client || !ref.current) return;
    try {
      ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({});
    } catch {
      // ignore
    }
  }, [client]);

  if (!client) {
    return (
      <div
        ref={ref}
        aria-hidden
        style={{
          border: '1px dashed rgba(255,255,255,0.15)',
          borderRadius: '1rem',
          padding: '1.5rem',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          margin: '2rem 0',
        }}
      >
        {label} · AdSense {slot}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ margin: '2rem 0', minHeight: 120 }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
