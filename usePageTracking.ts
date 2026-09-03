import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

/**
 * 페이지 이동 시 path와 referrer를 서버에 기록하는 훅.
 * App.tsx의 Router 컴포넌트 내부에서 한 번만 호출하면 됩니다.
 */
export function usePageTracking() {
  const [location] = useLocation();
  const prevLocation = useRef<string | null>(null);
  const track = trpc.analytics.track.useMutation();

  useEffect(() => {
    // /admin 경로는 추적 제외
    if (location.startsWith("/admin")) {
      prevLocation.current = location;
      return;
    }

    const referrer = prevLocation.current
      ? window.location.origin + prevLocation.current
      : document.referrer || "";

    track.mutate({ path: location, referrer });
    prevLocation.current = location;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
}
