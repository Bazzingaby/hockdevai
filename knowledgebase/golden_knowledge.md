# AlphaForge Golden Knowledge Base

This document is the single source of truth for the AlphaForge project. Keep it updated at the end of every working session so the whole team (including future Reinforcement Learning agents) can understand the current product state.

## Project Snapshot
- **Vision:** Build a friendly control center that helps a 15-year-old founder coordinate experts, research, and development tasks while staying aligned with the provided architecture diagram.
- **Current Sprint:** Sprint 1 – Foundation Setup
- **Next Milestone:** Fully wired authentication (Google, GitHub, API keys) and reinforcement feedback loop toggles in the UI.
- **Knowledge Sources:**
  - `project_report_to_consider_as_golden_source.txt`
  - Architecture diagram `Project development app architecture_appname_alphaforge.png`
  - Reinforcement logs saved through the API (`POST /api/knowledge/reinforce`).

## Architecture Modules
1. **Launcher / Fast briefing engine (Frontend Web App)**
   - Presents instructions, onboarding, and task board.
   - Offers connectors to Google, GitHub, and custom API/PAT tokens.
   - Guides the user through setup steps in plain language.
2. **Project Control Routing (Backend API)**
   - Express + TypeScript server.
   - Handles OAuth handshakes, token validation, knowledge base updates, and reinforcement events.
3. **Source Graph Database (Future work)**
   - Placeholder connectors for GitHub repository analysis.
   - Store repository metadata and change history.
4. **Backend Databanks (Knowledge Base)**
   - JSON file on disk until a database is selected.
   - Updated via API and mirrored in this golden document.
5. **Feedback and Reinforcement Layer**
   - Accepts reward signals (quality, speed, learning).
   - Can toggle RL-enabled mode and persist policy notes.

## Reinforcement Learning Workflow
1. Collect qualitative feedback after completing a task using the web UI or API.
2. Translate feedback into reward signals between -1 and 1.
3. Call `POST /api/knowledge/reinforce` with the signals and optional policy note.
4. The backend will update the `knowledgebase.json` file and stamp the time of the latest policy refresh.
5. Summarize important changes here so humans understand the reasoning trail.

## Deep Research Loop
When a feature needs deeper research:
1. Flip the “Deep Research mode” toggle in the web app. This adds a task flagged for research.
2. Gather findings (links, notes, experiments).
3. Update the golden knowledge base with a concise summary and links.
4. Plan the next action and assign it to a specialist through the task board.

## Task Board (mirror of API state)
- **arch-overview** (Owner: You) – Review architecture diagram and confirm module coverage. _Status: in-progress._

Update statuses as you make progress using the UI or by sending a `POST /api/knowledge/task` request with the latest data.

## Operating Agreements
- Keep instructions simple enough that a motivated 15-year-old can follow them.
- Every module change must be logged with a short rationale.
- Reinforcement settings should only be flipped on when enough feedback samples exist (minimum 5 signals).
- Always document new integrations, credentials, and follow-up steps before closing a work session.
