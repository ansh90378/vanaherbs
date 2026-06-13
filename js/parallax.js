/**
 * parallax.js — Subtle parallax on the landscape band image
 */

const band = document.getElementById('parallaxBand');
const img  = document.getElementById('parallaxImg');

if (band && img) {
  // Only run on devices that can handle it (no reduced-motion preference)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    function updateParallax() {
      const rect   = band.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;

      if (!inView) return;

      // pct: 0 when band bottom hits viewport top, 1 when band top hits viewport bottom
      const pct    = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (pct - 0.5) * 80; // max ±40px shift

      img.style.transform = `translateY(${offset}px)`;
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax(); // run once on mount
  }
}