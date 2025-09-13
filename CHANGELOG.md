# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-09-09

### Added

- **feat(ui)**: add chevron icons to expandable journal sections (commit: [`28fc060`](https://github.com/your-repo/commit/28fc060), author: Shreyash Raj, date: Tue Sep 9 22:07:52 2025 +0530)
  - Enhance user experience by adding rotatable chevron icons next to /play, /build, /learn, and /guides headings. The icons rotate 180 degrees when sections are expanded, providing clear visual feedback for the accordion state. Includes flex layout adjustments and smooth transitions for better alignment and animation.

- **feat(ui)**: add expandable sections for play, build, learn, and guides (commit: [`eae1625`](https://github.com/your-repo/commit/eae1625), author: Shreyash Raj, date: Tue Sep 9 21:12:49 2025 +0530)
  - Introduce interactive accordion-style sections to the journals page, each with toggleable content describing categories like /play, /build, /learn, and /guides. This enhances user engagement by allowing on-demand expansion of descriptive text for better navigation and discovery.

### Changed

- **refactor(ui)**: integrate custom fonts and update hero/navigation for Korzi branding (commit: [`d4fb490`](https://github.com/your-repo/commit/d4fb490), author: Shreyash Raj, date: Tue Sep 9 20:25:54 2025 +0530)
  - Update package.json to use turbopack for export builds
  - Add background image to hero section in footer
  - Replace Geist fonts with Inter and Bebas Neue in layout and globals.css
  - Simplify navbar by removing menu and CTA
  - Revise page content to reflect "logs" and "garage" themes
  - Add font configurations in new lib/font.ts

- **refactor(data)**: Switch to static local data.json for journals (commit: [`45e86c8`](https://github.com/your-repo/commit/45e86c8), author: Shreyash Raj, date: Mon Sep 8 22:45:02 2025 +0530)
  - Replace dynamic Strapi API fetches with static import from public/data.json in home and detail pages for offline/static export support
  - Update generateStaticParams accordingly
  - Add export script to package.json and disable image optimization in Next.js config
  - Minor UI tweaks for branding consistency

- **refactor(ui)**: Update branding with new logo assets and remove obsolete icons (commit: [`839d9fb`](https://github.com/your-repo/commit/839d9fb), author: Shreyash Raj, date: Mon Sep 8 20:41:29 2025 +0530)
  - Replace text-based logos in navbar and footer with Image components using new PNG assets (logo-horizontal.png, logo-stacked.png)
  - Add output: "export" configuration to next.config.ts for static site generation
  - Remove unused assets: file.svg, globe.svg, moniter.png, next.svg, vercel.svg, window.svg
  - Enhance error handling in generateStaticParams and API data validation in page.tsx for robustness

- **refactor(ui)**: Update branding to Korzi with custom fonts (commit: [`a63a907`](https://github.com/your-repo/commit/a63a907), author: Shreyash Raj, date: Mon Sep 8 17:02:46 2025 +0530)
  - Introduce Google Fonts (Inter, Bebas Neue, Ethnocentric) and update CSS variables for fonts and border color
  - Replace previous fonts and name "akshita agarwal" with "Korzi" in navbar and footer
  - Apply font-heading to headings across pages
  - Also await params in dynamic route and use Next.js Image in footer

- **refactor(ui)**: Replace hardcoded colors with CSS variables for theming (commit: [`d465bd2`](https://github.com/your-repo/commit/d465bd2), author: Shreyash Raj, date: Mon Sep 8 15:34:49 2025 +0530)
  - Replace all hardcoded hex color values in components and pages with CSS custom properties defined in globals.css
  - This enables dynamic theming, improves maintainability, and supports dark mode configurations

### Fixed

- **fix(page)**: Add safety check for missing data in generateStaticParams (commit: [`ab0c000`](https://github.com/your-repo/commit/ab0c000), author: Shreyash Raj, date: Mon Sep 8 15:43:15 2025 +0530)
  - Prevents potential errors by returning an empty array when data is not available, ensuring robust static parameter generation

- **fix(ui)**: Correct navbar links and remove static export config (commit: [`8a85431`](https://github.com/your-repo/commit/8a85431), author: Shreyash Raj, date: Mon Sep 8 15:12:13 2025 +0530)
  - Update navLinks array to route to proper pages (/work, /about, /shelf, /journal)
  - Remove 'output: export' from Next.js config to enable server-side features