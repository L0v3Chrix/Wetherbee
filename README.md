# Wetherbee Foundation - New Beginnings Scholarship

Scholarship application and admin management system honoring Matt Wetherbee's legacy by supporting Oxford House residents in Travis County.

## 📚 Documentation

All project documentation is maintained in the `/docs` folder with timestamped files:

- [2025-11-18-project-kickoff.md](docs/2025-11-18-project-kickoff.md) - Project overview and goals
- [2025-11-18-technical-architecture.md](docs/2025-11-18-technical-architecture.md) - System architecture and design
- [2025-11-18-implementation-plan.md](docs/2025-11-18-implementation-plan.md) - Development roadmap

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + Framer Motion
- **Database:** Vercel Postgres
- **Auth:** NextAuth.js v5
- **Email:** Gmail API
- **Storage:** Vercel Blob
- **Deployment:** Vercel

## 📁 Project Structure

```
/projects/2025-11-wetherbee-foundation/
├── /docs/                 # All documentation (timestamped)
├── /site/                 # Next.js application
│   ├── /app/             # App Router pages & API routes
│   ├── /components/      # React components
│   ├── /lib/             # Utilities, DB, Gmail, Auth
│   └── /public/          # Static assets
└── README.md             # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- Vercel account (for deployment)
- Google Cloud project (for Gmail API)
- PostgreSQL database (Vercel Postgres)

### Environment Variables

Copy `.env.example` to `.env.local` and fill in all required values:

```bash
cd site
cp .env.example .env.local
```

See [Technical Architecture docs](docs/2025-11-18-technical-architecture.md) for detailed environment variable setup.

### Installation

```bash
cd site
npm install
```

### Database Setup

1. Create Vercel Postgres database
2. Run schema migration:
```bash
# Copy the SQL from site/lib/db/schema.sql
# Run it in your Vercel Postgres dashboard
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 Key Features

### Public Experience
- Landing page with Matt Wetherbee memorial
- Multi-step scholarship application
- Winner showcase gallery
- Fundraising events visibility
- Donation integration (CashApp QR)

### Admin Dashboard
- Secure authentication (Google OAuth)
- Application management
- Winner selection workflow
- Email notifications
- Photo uploads
- Analytics & reporting

## 📧 Email Integration

System sends automated emails via Gmail API:
- Applicant confirmations
- Foundation alerts (new applications)
- Winner notifications
- Not-selected notifications

See [Gmail API setup docs](docs/2025-11-18-technical-architecture.md#gmail-api-integration) for configuration.

## 🔐 Security

- Admin access via whitelisted emails only
- NextAuth.js session-based authentication
- Protected API routes with middleware
- PII stored securely in PostgreSQL
- Environment variables for all secrets

## 📊 Development Status

**Phase 1: Foundation Setup** ✅ COMPLETE
- Project scaffolding
- Database schema
- Gmail API integration
- Core utilities

**Phase 2: Public Experience** 🏗️ IN PROGRESS
- Landing page
- Application funnel
- Winner gallery

**Phase 3: Admin Dashboard** 📋 PLANNED
- Authentication
- Application management
- Winner selection

**Phase 4: Polish & Launch** 📋 PLANNED
- Design refinement
- Performance optimization
- Testing & deployment

## 🤝 Contributing

This is a private project for the Wetherbee Foundation. All development follows the implementation plan in `/docs`.

## 📄 License

Private - All Rights Reserved

## 💙 Mission

Supporting Oxford House residents during their first 60 days of residency, honoring Matt Wetherbee's belief in second chances and new beginnings.

---

**Winners announced the first Monday of each month** 🏆
