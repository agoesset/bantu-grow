# Implementation Plan: BantuGrow Company Profile Website

## Overview

This plan implements the BantuGrow company profile (marketing) website as a statically generated Next.js (App Router) application built with TypeScript and Tailwind, assembled from Efferd/shadcn UI blocks. The implementation builds the pure logic layer first (product lookup, view models, contact-CTA round trip, validation, SEO metadata) with its property-based tests, then layers the lead-capture server action on top, and finally assembles the pages and shared layout from UI blocks and wires everything together. All user-facing copy is in Indonesian.

Property-based tests use `fast-check` with `vitest` (minimum 100 iterations each) and validate the eight correctness properties from the design. Sub-tasks marked with `*` are optional test tasks and may be skipped for a faster MVP.

## Tasks

- [x] 1. Scaffold the Next.js project and tooling
  - Initialize a Next.js App Router project with TypeScript and Tailwind CSS
  - Initialize shadcn/ui (`npx shadcn@latest init`) so Efferd blocks can be installed from the registry
  - Install and configure the test stack: `vitest` and `fast-check`, with a test script and a React Testing Library setup for component tests
  - Create the base directory layout: `app/`, `content/`, `lib/`, and `lib/__tests__/`
  - _Requirements: 8.3_

- [x] 2. Define static content and product data module
  - [x] 2.1 Implement the `Product` interface and seed product data
  - [x] 2.2 Create the central Indonesian copy module

- [x] 3. Implement the catalog logic layer (lookup and view models)
  - [x] 3.1 Implement product lookup and catalog/detail view-model builders
  - [x]* 3.2 Write property test for catalog view-model completeness
  - [x]* 3.3 Write property test for product detail view-model completeness
  - [x]* 3.4 Write property test for product lookup found / not-found

- [x] 4. Implement the product-aware contact-CTA link logic
  - [x] 4.1 Implement `buildContactHref` and `parseContactSubject`
  - [x]* 4.2 Write property test for the contact-CTA product round trip

- [x] 5. Implement shared contact-form validation
  - [x] 5.1 Implement the Zod-based validation module
  - [x]* 5.2 Write property test for email format validation
  - [x]* 5.3 Write property test for validation completeness and value retention

- [x] 6. Implement SEO metadata builders
  - [x] 6.1 Implement `homeMeta`, `catalogMeta`, and `productMeta`
  - [x]* 6.2 Write property test for SEO metadata presence and title uniqueness

- [x] 7. Implement the lead sink and contact server action
  - [x] 7.1 Implement the `LeadSink` interface and default implementation
  - [x] 7.2 Implement the `submitLead` server action
  - [x]* 7.3 Write integration tests for the contact server action

- [x] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Build the shared layout: header navigation and footer
  - [x] 9.1 Install and populate the header (Navigation_Menu) and footer blocks
  - [x]* 9.2 Write unit/responsive tests for navigation and footer

- [x] 10. Build the Home page
  - [x] 10.1 Assemble the Home page from Efferd blocks
  - [x]* 10.2 Write unit tests for the Home page

- [x] 11. Build the Product Catalog page
  - [x] 11.1 Assemble the catalog grid and empty state
  - [x]* 11.2 Write unit test for the empty-catalog edge case

- [x] 12. Build the Product Detail page and not-found view
  - [x] 12.1 Assemble the product detail page with `generateStaticParams`
  - [x] 12.2 Implement the not-found view
  - [x]* 12.3 Write unit test for the not-found view

- [x] 13. Build the Company Information page
  - Create `/tentang` rendering BantuGrow's mission and focus on UMKM plus contact channels including at least an email address, in Indonesian, from the copy module
  - _Requirements: 6.1, 6.2_

- [x] 14. Build the Contact page and lead-capture form
  - [x] 14.1 Assemble the contact form and wire it to the server action
  - [x]* 14.2 Write unit tests for the contact form

- [x] 15. Implement SEO wiring, single primary heading, and image optimization
  - [x] 15.1 Wire metadata, single h1, and responsive images
  - [x]* 15.2 Write property test for single primary heading per page
  - [x]* 15.3 Write integration tests for SSR delivery and image pipeline

- [x] 16. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test tasks and can be skipped for a faster MVP.
- Each task references specific requirements for traceability.
- Property tests (Properties 1–8) validate universal correctness of the pure logic layer using `fast-check` + `vitest` at a minimum of 100 iterations each, tagged `Feature: bantugrow-company-profile, Property {number}: {property_text}`.
- Unit, snapshot, integration, and smoke tests cover fixed UI structure, responsive layout, SSR delivery, and the image pipeline where universal properties do not apply.
- Checkpoints ensure incremental validation at natural breaks.
