# Project notes

## Upload preparation

Source: AI_VIDEO GENERATOR.zip, inner folder AI_VIDEO GENERATOR/ai-short-video-generator.
Excluded node_modules, .next, .git, real environment files, output.mp3, and Default.txt.
Added a blank .env.example and allowed it through .gitignore.
Scanned extracted text for original environment values and common credential patterns; redacted a matching value in source. This is a limited scan, not a security audit.
No application build, dependency installation, database change, or paid API call was performed.

## Before deployment

- Remove direct database imports from client components, including app/provider.js, dashboard pages, and PlayerDialog. Use authenticated server handlers and a server-only database URL. NEXT_PUBLIC_DRIZZLE_DATABASE_URL must not hold live database credentials in a browser bundle.
- Keep Gemini/provider credentials server-side. Add authentication, authorization, validation, and rate limits to generation routes.
- Configure your own Firebase project and Storage access rules.
- Verify external models, dependency security, Text-to-Speech authentication, and service responses.
- Verify export independently: a Remotion preview does not establish working downloadable video rendering.
- Confirm attribution and bundled asset rights before public release.
