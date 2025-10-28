# marketing-site Specification

## Purpose
TBD - created by archiving change add-landing-page. Update Purpose after archive.
## Requirements
### Requirement: OnReal Landing Hero
The marketing site MUST expose a hero section on the `/` route that communicates OnReal's positioning and a primary action.

#### Scenario: Hero renders with headline and CTAs
- **GIVEN** a visitor loads `/`
- **WHEN** the page finishes initial render
- **THEN** the hero headline includes the phrase "Operating System for Real World Assets"
- **AND** a supporting subheading summarizes the developer value proposition in one sentence
- **AND** two prominent CTAs are visible: one to request access and one to view documentation

### Requirement: Feature Highlights
The landing page MUST showcase core capabilities in a scannable section directly below the hero.

#### Scenario: Feature list presents three capabilities
- **GIVEN** a visitor scrolls past the hero
- **WHEN** the feature section is in view
- **THEN** at least three feature items display a title, short description, and icon or visual accent
- **AND** feature copy emphasizes developer acceleration, compliance coverage, and asset lifecycle automation

### Requirement: Developer Resources Callout
The landing experience MUST guide builders toward next steps with documentation and contact options.

#### Scenario: Developer CTA block offers docs and contact
- **GIVEN** the visitor reaches the call-to-action section near the end of the page
- **WHEN** the block renders
- **THEN** it includes a direct link to developer documentation
- **AND** a secondary action to request a demo or talk to sales
- **AND** supporting copy reassures enterprise readiness (security, compliance, or custody support)

### Requirement: Responsive Layout and Metadata
The landing page MUST be responsive and include minimal marketing metadata for sharing.

#### Scenario: Mobile viewport renders content stack and metadata
- **GIVEN** a viewport width of 375px
- **WHEN** the page loads
- **THEN** hero, feature, and CTA sections stack vertically with readable spacing
- **AND** the `<head>` metadata defines `title`, `description`, and Open Graph image values representing OnReal
- **AND** navigation and footer links remain accessible without horizontal scrolling

