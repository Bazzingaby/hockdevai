# AlphaForge Project Control Center

AlphaForge is a friendly workspace that helps you (and any 15-year-old teammate) plan, build, and improve a product while
following the provided architecture diagram. The system is split into a TypeScript API server, a React + Vite web app, and a
living knowledge base that captures every lesson.

## Repository Map

```text
.
├── knowledgebase/                # Golden knowledge base for the whole team
├── server/                       # Express + TypeScript backend API
├── webapp/                       # React + Vite frontend control center
├── project_report_to_consider_as_golden_source.txt
└── Project development app architecture_appname_alphaforge.png
```

## Quick Start (Read aloud to the team)
1. **Install tools**
   - Install Node.js 18 or newer.
   - Run `npm install` inside both `server` and `webapp` folders.
2. **Prepare secrets**
   - Copy `server/.env.example` (create it using the table below) to `server/.env` and add OAuth keys.
   - Keep OAuth client IDs and secrets private. Never commit `.env` files.
3. **Run the backend**
   - Inside `server`: `npm run dev`
   - The API listens on <http://localhost:4000>. Visit `/` to confirm it’s alive.
4. **Run the frontend**
   - Inside `webapp`: `npm run dev`
   - Open the printed localhost link (default <http://localhost:5173>). The UI guides you through the mission.
5. **Update the golden knowledge base**
   - After each session, add a note to `knowledgebase/golden_knowledge.md` so everyone stays in sync.

### Example `server/.env`

| Key | Value |
| --- | ----- |
| `PORT` | `4000` |
| `APP_SECRET` | A long random string used to sign session tokens |
| `GOOGLE_CLIENT_ID` | OAuth client ID from Google Cloud console |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret |
| `GITHUB_CLIENT_ID` | OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | OAuth app client secret |

> Tip: If you don’t have OAuth keys yet, you can still test using PAT/API tokens in the UI.

## Frontend Overview
- Written in React + TypeScript with Tailwind CSS for quick styling.
- Uses React Query to stay in sync with the API.
- Includes panels for onboarding steps, task assignments, deep research mode, and reinforcement learning feedback.
- Connects to Google or GitHub through OAuth placeholders or API tokens (PAT).

## Backend Overview
- Express server with endpoints under `/api`.
- Routes include:
  - `GET /api/knowledge` – fetch the golden knowledge state.
  - `POST /api/knowledge/task` – add or update tasks for specialists.
  - `POST /api/knowledge/reinforce` – push reward signals that update the reinforcement notes.
  - `GET /api/auth/:provider/start` – placeholder instructions for OAuth kickoff.
  - `POST /api/auth/:provider/finish` – exchange authorization codes for temporary JWTs.
  - `POST /api/auth/:provider/token` – verify API keys/PAT tokens and return a signed session token.
- Knowledge base is stored at `server/src/data/knowledgebase.json` and mirrored in `knowledgebase/golden_knowledge.md`.

## Reinforcement Learning Hooks
1. Collect feedback after completing a task (quality, speed, learning scores from -1 to 1).
2. Submit the feedback through the Reinforcement Engine panel or call the API directly.
3. The backend stores the summary and toggles RL mode when you decide it’s ready.
4. Update the golden knowledge base with the insight so humans and agents see the latest policy.

## Deep Research Loop
- Flip the “Deep Research mode” toggle in the UI when an item needs extra investigation.
- This app appends a reminder to your task notes so you remember to document findings.
- Store final discoveries in `knowledgebase/golden_knowledge.md` and share actions with teammates.

## Deploying (future step)
- Containerize the API and frontend separately.
- Use managed secrets for OAuth keys.
- Point the frontend’s `/api` proxy to the deployed backend URL.

## Contributing
1. Fork or branch this repository.
2. Update tasks through the UI so the team sees your work.
3. Add documentation to the golden knowledge base before opening a pull request.
4. Run `npm run build` in both `server` and `webapp` to ensure TypeScript compiles without errors.

Now you’re ready to build AlphaForge with clarity and confidence!
