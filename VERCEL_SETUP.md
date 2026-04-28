VERCEL DEPLOYMENT INSTRUCTIONS
================================

If you're still getting the "Service 'frontend' must specify framework" error:

**Required Vercel Dashboard Settings:**

1. Go to your Vercel project: lumiere
2. Navigate to: Settings → General
3. Find "Root Directory" field
4. Set it to: frontend
5. Save changes
6. Trigger a new deployment

This tells Vercel to treat ONLY the frontend/ directory as the project root, ignoring the backend and other files.

After setting the root directory to "frontend":
- Vercel will auto-detect Next.js framework
- It will run `npm install && npm run build` in the frontend directory
- The build will succeed

If you don't have access to change Root Directory settings:
- You may need to recreate the Vercel project or contact Vercel support
