# AI Short Video Generator

A Next.js project that assembles short video content from a chosen topic, visual style, and duration. The source integrates AI scripts, generated images, speech synthesis, word captions, and a Remotion preview.

## Stack

Next.js 14, React 18, Tailwind CSS and Radix UI; Clerk authentication; Gemini scripts; Replicate images; Google Cloud Text-to-Speech narration; AssemblyAI captions; Firebase Storage; Neon PostgreSQL with Drizzle; Remotion video composition.

## Local setup

1. Install a Node.js version compatible with the bundled Next.js version.
2. Run `npm ci` to install lockfile dependencies.
3. Copy `.env.example` to `.env.local` and configure your own service accounts and credentials. Clerk sign-in routes are `/sign-in` and `/sign-up`.
4. Replace the Firebase project settings in `configs/FirebaseConfig.js` with your own configuration.
5. Review database configuration and schema before using `npm run db:push`, which changes the target database.
6. Run `npm run dev` and open `http://localhost:3000`.

Generation requires external services and may incur charges. These are source-derived setup steps; the application was not installed, built, or run during upload preparation.

## Status

This project was developed as a prototype and is no longer actively maintained. It is preserved here as a record of the implementation and experiments at that stage. External services, models, and dependencies may require updates before running it today. See `PROJECT_NOTES.md` for technical setup and deployment considerations.

Dependencies, build caches, the real environment file, and generated audio were excluded. The blank environment example contains names only. A copied configuration value was redacted from source. The original ZIP is unchanged.
