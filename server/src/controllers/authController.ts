import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

const APP_SECRET = process.env.APP_SECRET ?? 'dev-secret';

function createToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '4h' });
}

export async function startOAuth(req: Request, res: Response) {
  const provider = req.params.provider;
  res.json({
    message: `Redirect the user to the ${provider} OAuth URL from the frontend.`,
    provider
  });
}

export async function finishOAuth(req: Request, res: Response) {
  const { provider } = req.params;
  const { code } = req.body;
  res.json({
    provider,
    token: createToken({ provider, code }),
    note: 'Exchange the code for an access token on the server in production.'
  });
}

export async function verifyApiKey(req: Request, res: Response) {
  const { provider } = req.params;
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ error: 'token is required' });
    return;
  }

  if (provider === 'github') {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${token}` }
      });
      if (!response.ok) {
        throw new Error('GitHub token invalid');
      }
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
      return;
    }
  }

  res.json({ provider, token: createToken({ provider, tokenSource: 'api-key' }) });
}
