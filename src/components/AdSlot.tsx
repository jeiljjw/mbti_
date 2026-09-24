import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot?: string;
  label?: string;
}

// AdSense-ready slot.
// - 심사 전(클라이언트 ID 없음): 아무것도 렌더링하지 않음. 심사자가
//   점선 placeholder를 저품질 신호로 볼 수 있어 return null이 안전.
// - 승인 후(VITE_ADSENSE_CLIENT 설정): 실제 광고 + CLS 홀더 렌더링.
export const AdSlot = ({ slot = 'auto' }: AdSlotProps) => {
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
    return null;
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
