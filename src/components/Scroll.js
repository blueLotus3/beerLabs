import { useEffect } from "react";

export default function useScroll(key, containerId, thumbId, deps = []) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    const thumb = thumbId ? document.getElementById(thumbId) : null;
    if (!container) return;

    const restoreScroll = () => {
      const saved = localStorage.getItem(key);
      if (!saved) return;

      const pos = parseInt(saved, 10);
      container.scrollLeft = pos;

      if (thumb) {
        const scrollWidth = container.scrollWidth - container.clientWidth;
        const trackWidth = thumb.parentElement.clientWidth - thumb.clientWidth;
        thumb.style.left = (pos / scrollWidth) * trackWidth + "px";
      }
    };

    const interval = setInterval(() => {
      if (container.scrollWidth > container.clientWidth) {
        restoreScroll();
        clearInterval(interval);
      }
    }, 50);

    const savePos = () => {
      localStorage.setItem(key, container.scrollLeft);
      if (thumb) {
        const scrollWidth = container.scrollWidth - container.clientWidth;
        const trackWidth = thumb.parentElement.clientWidth - thumb.clientWidth;
        thumb.style.left = (container.scrollLeft / scrollWidth) * trackWidth + "px";
      }
    };

    container.addEventListener("scroll", savePos);

    return () => {
      container.removeEventListener("scroll", savePos);
      clearInterval(interval);
    };
  // Pass deps as a single dependency array to avoid spread warning
  }, [key, containerId, thumbId, deps]);
}