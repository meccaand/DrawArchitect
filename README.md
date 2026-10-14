# DrawArchitect

A lightweight interior design web app. Set your room dimensions, add objects, and see them on a gridded 3D wireframe viewport with dimension overlays (major lines every foot, minor lines every inch). Objects can be added through a guided chat/chip interface.

Built with React, TypeScript, Vite, Tailwind and shadcn/ui on the client, and Express on the server. Originally created on Replit.

## Requirements

- Node.js 20 or newer
- npm

No API keys or database are needed to run it locally. Server storage is in-memory, so nothing persists between restarts.

## Run locally

```bash
git clone https://github.com/meccaand/DrawArchitect.git
cd DrawArchitect
npm install
npm run dev
```

Then open http://localhost:5000. To use another port: `PORT=3000 npm run dev`.

## Other scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Express + Vite HMR) |
| `npm run build` | Build the client and bundle the server into `dist/` |
| `npm start` | Run the production build (`npm run build` first) |
| `npm run check` | Type-check with `tsc` |

## Project layout

- `client/src/components/ViewportCanvas.tsx`: the grid viewport
- `client/src/components/RoomDimensions.tsx`: room size controls
- `client/src/components/ChipInterface.tsx`, `ConversationalChat.tsx`: guided object creation
- `server/`: Express server (serves the API and the client)
- `shared/schema.ts`: shared types and schema
- `design_guidelines.md`: UI design notes

## Notes

- `drizzle.config.ts` and `@neondatabase/serverless` are leftovers from the Replit template. The app doesn't use a database yet, so `npm run db:push` isn't needed.
