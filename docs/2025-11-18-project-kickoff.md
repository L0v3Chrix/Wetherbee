# Wetherbee Foundation - Project Kickoff
**Date:** November 18, 2025
**Project:** Scholarship Application & Admin Management System
**Client:** Wetherbee Foundation
**GitHub:** https://github.com/L0v3Chrix/Wetherbee.git

---

## Context

The Wetherbee Foundation honors Matt Wetherbee's legacy by providing scholarships to Oxford House residents in Travis County during their first 60 days of residency. Currently, the application process is scattered across emails and Google Forms, creating administrative chaos and diminishing the dignity of the experience.

**Goal:** Transform this into a professional, story-driven digital experience that:
- Honors applicants' dignity and courage
- Streamlines administration with comprehensive management tools
- Showcases the foundation's impact through winner galleries
- Provides clear timeline and communication (winners announced first Monday each month)

---

## Project Mission

**"Transform application chaos into an organized, hopeful journey that respects applicants' dignity while showcasing the foundation's impact - WITH admin tools to manage everything."**

---

## Core Requirements

### 1. Public-Facing Experience
- **Landing Page:** Matt Wetherbee memorial, mission statement, winner gallery
- **Application Funnel:** Multi-step "New Beginnings Application"
- **60-Day Eligibility:** Automatic validation of Oxford House move-in date
- **Winner Showcase:** Dynamic gallery of past recipients with photos
- **Fundraising Events:** Chili Cook-Off, Mac & Cheese, Turkey Sales visibility
- **Donation Integration:** CashApp QR code prominent placement

### 2. Application Experience
**Progressive Multi-Step Form:**
- Step 1: Contact Info (name, email, phone, Oxford House, move-in date)
- Step 2: Your Story (where you came from, where you're going)
- Step 3: Why This Matters (why you deserve this scholarship)
- Step 4: Thank You (confirmation with timeline)

**Features:**
- Progress indicator throughout journey
- Auto-save to never lose applicant data
- 60-day move-in validation
- Gmail notifications (applicant confirmation + foundation alert)
- Clear messaging about first Monday selection process
- Reapplication-friendly (can apply multiple times in 60-day window)

### 3. Admin Dashboard (Secure)
**Authentication:** NextAuth.js v5 with Google OAuth
**Authorized Emails:** wetherbeefoundation@oxfordhouse.us

**Dashboard Capabilities:**
- Application management (view, filter, search, status tracking)
- Winner selection workflow with automated email notifications
- Winner gallery management (upload photos, manage entries)
- Email management (templates, bulk sending, logs)
- Analytics & reporting (applications over time, completion rates)

---

## Tech Stack

```yaml
Framework: Next.js 14 (App Router)
Language: TypeScript 5.0+
Styling: TailwindCSS + Framer Motion
Forms: Progressive multi-step with validation
API: Custom route handlers
Email: Gmail API (Free Nonprofit Google Workspace)
Auth: NextAuth.js v5 for admin login
Database: Vercel Postgres (initial choice - simple, integrated)
Storage: Vercel Blob Storage for winner photos
Analytics: Google Analytics 4 (optional)
Deployment: Vercel (auto-deploy from GitHub)
```

---

## Success Metrics

**User Experience:**
- Form completion rate >70% (target)
- Clear understanding of timeline (measured by support inquiries)
- Dignified, respectful application journey
- Mobile-optimized experience

**Administrative Efficiency:**
- Zero lost applications
- <5 minutes to review single application
- One-click winner selection and notification
- Automated email workflows
- Clear audit trail of all actions

**Technical Performance:**
- Lighthouse scores 90+ across all metrics
- Sub-3 second page loads
- 99.9% uptime
- Secure data handling (PII protection)
- WCAG 2.1 AA accessibility compliance

---

## Timeline & Phases

### Phase 1: Foundation (Week 1)
- Project setup and documentation
- Next.js scaffolding with TypeScript
- Database schema creation
- Gmail API integration setup
- Basic component structure

### Phase 2: Public Experience (Week 2)
- Landing page design and implementation
- Multi-step application form
- Email notification system
- Thank you page experience
- Winner gallery (public view)

### Phase 3: Admin Dashboard (Week 3)
- NextAuth.js authentication setup
- Application management interface
- Winner selection workflow
- Photo upload system
- Email management tools

### Phase 4: Polish & Deploy (Week 4)
- Design refinement (exceptional, not acceptable)
- Performance optimization
- Security audit
- Comprehensive testing
- Production deployment
- Client handoff documentation

---

## Current Position

**Status:** Project initiated - scaffolding phase
**Location:** `/projects/2025-11-wetherbee-foundation/`
**Branch:** Will create feature branches from main
**Documentation:** All specs and progress tracked in `/docs/` with timestamped files

---

## Next Steps

1. ✅ Create project folder structure
2. ✅ Initialize documentation
3. ⏳ Initialize Next.js 14 with TypeScript
4. ⏳ Connect to GitHub repository
5. ⏳ Create database schema files
6. ⏳ Scaffold complete directory structure
7. ⏳ Install dependencies (NextAuth, googleapis, @vercel/blob, etc.)
8. ⏳ Set up environment variables template
9. ⏳ Create foundational helper functions

---

## Design Direction Notes

**Tone:** Dignified, hopeful, respectful
**Visual Style:** Clean, professional, warm
**Inspiration Sources:**
- Memorial/tribute websites (respectful honor)
- Nonprofit scholarship platforms (clear, accessible)
- Story-driven experiences (human-centered)

**Color Palette Ideas:**
- Warm, trustworthy blues (stability, hope)
- Accent of gold/amber (achievement, value)
- Soft neutrals (dignity, clarity)
- Avoid: Cold corporate, overly bright, cluttered

**Key Design Principles:**
1. Every interaction honors applicants' courage
2. Clear, simple navigation (no confusion)
3. Story takes center stage
4. Admin tools feel powerful but approachable
5. Mobile experience equals desktop priority

---

**Document Created:** November 18, 2025
**Last Updated:** November 18, 2025
**Status:** Active Development
