# PageSpeed / performance

## Changes made in the app

1. **Instant FCP/LCP (static shell)**  
   A static hero (black background + “REAL MACHINES. REAL MOTION.”) is in the HTML inside `#root`. It paints as soon as the HTML is parsed, so FCP/LCP don’t wait for JavaScript. React replaces it when the app mounts.

2. **LCP (hero video)**  
   The hero video has an inline **poster** (small SVG) so the browser paints the hero area immediately.  
   **Optional:** Use a real frame as `/assets/homepage/hero-poster.jpg` on S3 for a better look.

3. **Render-blocking**  
   All analytics (gtag + GTM) run only after `window.load`, so they don’t block first paint.

4. **Below-the-fold images**  
   `loading="lazy"` on images in SpecsSection, ApexDriveSection, DetailCarousel, Services, CarAnimation, MissionSection, JoinFamSection, and Footer.

5. **Smaller initial JS**  
   - Route-level: non-home pages are lazy-loaded (React.lazy).  
   - Home page: MissionSection, FaqSection, InsightsSection, JoinFamSection, and Footer are lazy-loaded so the first JS chunk is smaller.  
   - Vite `manualChunks`: vendor, router, three, shopify, motion are split into separate chunks.

6. **Critical assets**  
   - `preconnect` to CloudFront so the connection is ready for logo/video.  
   - `preload` for the logo image (LCP candidate in header).  
   - Logo img: `fetchPriority="high"`, `decoding="async"`, and explicit `width`/`height` to avoid layout shift.

## What you need to do on the server

### Cache lifetimes (fixes “Use efficient cache lifetimes” ~81 MB)

You deploy to a **Hostinger VPS with nginx**. Add cache headers so static assets are cached by the browser:

- Use the snippet in **`nginx-cache-headers.conf`** inside your nginx `server { }` block.
- Reload nginx: `sudo nginx -t && sudo systemctl reload nginx`.

Without this, every visit re-downloads JS/CSS/images and PageSpeed will keep reporting the cache issue.

### Image delivery (“Improve image delivery” ~79 MB)

PageSpeed is mostly complaining about:

- **Hero video** – large file; the poster fix improves LCP but the video still counts for “image delivery.” Consider a shorter/lighter hero clip or lower resolution for mobile if possible.
- **Large PNGs** – wherever you can, use **WebP** (and optionally AVIF) and serve them from S3/CloudFront (e.g. same key with `.webp`). You can keep PNG as fallback.
- **Sizing** – serve responsive widths (e.g. `srcset` or different URLs per breakpoint) so mobile doesn’t download desktop-sized images.

Implementing WebP + cache headers on the server will address most of the “Improve image delivery” and “Use efficient cache lifetimes” savings.

---

## Further optimizations (optional)

- **Service worker** – Cache static assets (JS/CSS/images) for repeat visits (e.g. with Workbox or Vite PWA plugin).
- **Font subsetting** – Restrict Google Fonts to the characters you use (e.g. `&text=REALMACHINES...`) to reduce font file size.
- **Hero video for mobile** – Serve a shorter or lower-resolution video for small viewports (e.g. `<source media="(max-width: 768px)" src="...hero-mobile.mp4">`).
- **Critical CSS** – Inline the minimal CSS needed for above-the-fold content (advanced; usually via a build plugin).
- **Preload key script** – Vite already injects `modulepreload` for the entry and lazy chunks; no extra step needed.
