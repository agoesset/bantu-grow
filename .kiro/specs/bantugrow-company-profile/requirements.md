# Requirements Document

## Introduction

BantuGrow is a SaaS provider serving Indonesian micro, small, and medium enterprises (UMKM) across multiple niches, including Mutaba'ah Digital, Management Travel Umroh, and Point of Sale (POS). This specification covers the **company profile (marketing) website** for BantuGrow — not the SaaS products themselves. The website's purpose is to introduce the BantuGrow brand, present its range of SaaS offerings for UMKM, build credibility, and convert visitors into leads (sign-ups, demo requests, or contact inquiries).

The website prioritizes a fast, clean user experience built from pre-built UI blocks/components (Efferd, a shadcn/ui block library) so that pages render quickly and the visual design stays consistent. Primary content is presented in Indonesian, the language of the target audience.

## Glossary

- **BantuGrow_Website**: The public-facing company profile / marketing website for BantuGrow.
- **Visitor**: Any unauthenticated user browsing the BantuGrow_Website.
- **Lead**: A Visitor who submits contact details through a form to express interest in a product or the company.
- **Navigation_Menu**: The persistent header navigation that links to the main pages and sections of the BantuGrow_Website.
- **Footer**: The persistent bottom section containing secondary links, company information, and contact details.
- **Home_Page**: The primary landing page of the BantuGrow_Website.
- **Product**: A single SaaS offering from BantuGrow (e.g., Mutaba'ah Digital, Management Travel Umroh, POS).
- **Product_Catalog**: The collection of all Products presented on a dedicated page or section.
- **Product_Detail_Page**: A page presenting full information about a single Product.
- **Contact_Form**: A form through which a Visitor submits contact details and a message to become a Lead.
- **CTA**: Call-to-action element (button or link) that directs a Visitor toward a conversion action such as requesting a demo or contacting BantuGrow.
- **UI_Block_Library**: The pre-built component/block source (Efferd, based on shadcn/ui) used to assemble pages.
- **Breakpoint**: A defined viewport width at which the layout adapts (mobile, tablet, desktop).

## Requirements

### Requirement 1: Home Page Presentation

**User Story:** As a Visitor, I want a clear landing page that explains what BantuGrow offers, so that I can quickly understand whether BantuGrow's services fit my UMKM needs.

#### Acceptance Criteria

1. WHEN a Visitor opens the root URL, THE BantuGrow_Website SHALL display the Home_Page containing a hero section with a headline, a supporting description, and at least one CTA.
2. THE Home_Page SHALL display a section summarizing the range of Products offered by BantuGrow with at least the Product name and a short description for each highlighted Product.
3. THE Home_Page SHALL display a section describing the value proposition of BantuGrow for UMKM.
4. THE Home_Page SHALL render its primary text content in Indonesian.
5. THE Home_Page SHALL display a CTA that links to the Contact_Form.

### Requirement 2: Site Navigation

**User Story:** As a Visitor, I want consistent navigation, so that I can move between pages and sections of the website easily.

#### Acceptance Criteria

1. THE BantuGrow_Website SHALL display a Navigation_Menu on every page.
2. THE Navigation_Menu SHALL provide links to the Home_Page, the Product_Catalog, the company information section, and the Contact_Form.
3. WHEN a Visitor selects a link in the Navigation_Menu, THE BantuGrow_Website SHALL navigate to the corresponding page or section.
4. WHILE the viewport width is at or below the mobile Breakpoint, THE Navigation_Menu SHALL present its links through a collapsible menu control.
5. THE BantuGrow_Website SHALL display a Footer on every page containing company information, navigation links, and contact details.

### Requirement 3: Product Catalog

**User Story:** As a Visitor, I want to browse the full list of BantuGrow's SaaS products, so that I can find the offering relevant to my business niche.

#### Acceptance Criteria

1. WHEN a Visitor opens the Product_Catalog, THE BantuGrow_Website SHALL display every available Product as a card showing the Product name, a short description, and a link to its Product_Detail_Page.
2. WHEN a Visitor selects a Product card, THE BantuGrow_Website SHALL navigate to the corresponding Product_Detail_Page.
3. THE Product_Catalog SHALL display each Product's associated business niche label.
4. IF the Product_Catalog has no Products to display, whether because none exist or because the Products fail to load, THEN THE BantuGrow_Website SHALL display a message indicating that no Products are currently available.

### Requirement 4: Product Detail Page

**User Story:** As a Visitor, I want detailed information about a specific product, so that I can evaluate whether it meets my needs before contacting BantuGrow.

#### Acceptance Criteria

1. WHEN a Visitor opens a Product_Detail_Page, THE BantuGrow_Website SHALL display the Product name, a full description, and a list of the Product's key features.
2. THE Product_Detail_Page SHALL display a CTA that links to the Contact_Form with the relevant Product identified.
3. IF a Visitor requests a Product_Detail_Page for a Product that does not exist, THEN THE BantuGrow_Website SHALL display a not-found message together with a link back to the Product_Catalog, presenting the message only when the accompanying link can also be displayed.

### Requirement 5: Lead Capture via Contact Form

**User Story:** As a Visitor interested in BantuGrow, I want to submit my contact details, so that the BantuGrow team can follow up with me.

#### Acceptance Criteria

1. THE Contact_Form SHALL provide input fields for the Visitor's name, email address, and message.
2. WHEN a Visitor submits the Contact_Form with all required fields completed and a valid email address, THE BantuGrow_Website SHALL record the submission as a Lead and display a confirmation message.
3. IF a Visitor submits the Contact_Form with any required field empty, THEN THE BantuGrow_Website SHALL display a validation message identifying each empty required field and SHALL retain the values already entered.
4. IF a Visitor submits the Contact_Form with an email address that does not match a valid email format, THEN THE BantuGrow_Website SHALL display a validation message indicating the email format is invalid.
5. WHERE a Visitor arrives at the Contact_Form from a Product_Detail_Page CTA, THE Contact_Form SHALL pre-select the related Product as the subject of the inquiry.

### Requirement 6: Company Information

**User Story:** As a Visitor, I want to learn about BantuGrow as a company, so that I can trust the provider before engaging.

#### Acceptance Criteria

1. THE BantuGrow_Website SHALL display a company information section describing BantuGrow's mission and focus on serving UMKM.
2. THE company information section SHALL display BantuGrow's contact channels, including at least an email address.

### Requirement 7: Responsive Layout

**User Story:** As a Visitor using a mobile device, I want the website to adapt to my screen, so that I can read content and interact comfortably.

#### Acceptance Criteria

1. WHILE the viewport width is at or above the desktop Breakpoint, THE BantuGrow_Website SHALL display content using the desktop layout.
2. WHILE the viewport width is below the mobile Breakpoint, THE BantuGrow_Website SHALL display content using a single-column mobile layout.
3. THE BantuGrow_Website SHALL keep all interactive controls reachable and operable at every supported Breakpoint.

### Requirement 8: Performance and Fast Rendering

**User Story:** As a Visitor, I want pages to load quickly, so that I can access information without waiting.

#### Acceptance Criteria

1. WHEN a Visitor requests any page on a broadband connection, THE BantuGrow_Website SHALL render the page's primary above-the-fold content within 3 seconds.
2. THE BantuGrow_Website SHALL serve images in a compressed format sized for the requesting Breakpoint.
3. THE BantuGrow_Website SHALL assemble page layouts from the UI_Block_Library to maintain consistent styling across pages.

### Requirement 9: Discoverability and SEO

**User Story:** As a marketing stakeholder, I want the website to be discoverable by search engines, so that potential UMKM customers can find BantuGrow online.

#### Acceptance Criteria

1. THE BantuGrow_Website SHALL provide a unique page title and meta description for the Home_Page, the Product_Catalog, and each Product_Detail_Page.
2. THE BantuGrow_Website SHALL expose a single primary heading on each page describing that page's purpose.
3. WHEN a search engine crawler requests a page, THE BantuGrow_Website SHALL return the page's primary content in the initial response.
