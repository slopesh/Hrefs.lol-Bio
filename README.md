# href.lol - Modern Bio Links Platform

A beautiful, modern bio links platform built with Next.js 14, TailwindCSS, and Prisma.

## Features

- 🎨 Beautiful, customizable themes
- 🔒 Invite-only authentication
- 📊 Analytics dashboard
- 🏷️ Custom badge system
- 🌐 Custom domain support
- 🤖 AI-powered bio generator
- 📱 Mobile-first design
- 🎵 Embedded music player
- 🔗 Link management
- 👥 Admin dashboard

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **Database:** PostgreSQL with Prisma
- **Authentication:** Custom invite-based auth
- **Deployment:** Vercel (Frontend), Railway/Supabase (Backend & Database)
- **Analytics:** Vercel Analytics
- **Icons:** React Icons
- **Animations:** Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Vercel account (for deployment)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hrefdotlol"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email (Optional)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="user"
SMTP_PASSWORD="password"
SMTP_FROM="noreply@href.lol"
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hrefdotlol/href.lol.git
   cd href.lol
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure

```
href.lol/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   └── [username]/        # Public profile routes
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/               # Database schema
└── public/               # Static assets
```

### Database Schema

The project uses Prisma with PostgreSQL. Key models include:

- User
- BioPage
- Link
- Badge
- InviteCode
- Analytics

## Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by e-z.bio and guns.lol
- Built with modern web technologies
- Thanks to all contributors! 