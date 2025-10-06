import axios from 'axios';
import { useState } from 'react';

type Provider = 'google' | 'github';

const oauthLinks: Record<Provider, string> = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  github: 'https://github.com/login/oauth/authorize'
};

function AuthConnector() {
  const [provider, setProvider] = useState<Provider>('google');
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  async function handleFinishOAuth() {
    const response = await axios.post(`/api/auth/${provider}/finish`, { code });
    setMessage(`Temporary token created. Save securely: ${response.data.token}`);
  }

  async function handleApiToken() {
    const response = await axios.post(`/api/auth/${provider}/token`, { token });
    setMessage(`API token stored! Use this JWT for app sessions: ${response.data.token}`);
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-200">
      <h2 className="text-lg font-semibold text-primary">Connect your tools</h2>
      <p className="mt-1 text-slate-300">
        Choose a provider, then either run the OAuth flow or paste a Personal Access Token (PAT).
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <label className="flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1">
          <input
            type="radio"
            name="provider"
            value="google"
            checked={provider === 'google'}
            onChange={() => setProvider('google')}
          />
          Google
        </label>
        <label className="flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1">
          <input
            type="radio"
            name="provider"
            value="github"
            checked={provider === 'github'}
            onChange={() => setProvider('github')}
          />
          GitHub
        </label>
      </div>

      <div className="mt-3 space-y-2">
        <a
          className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 font-semibold text-slate-900"
          href={oauthLinks[provider]}
          target="_blank"
          rel="noreferrer"
        >
          Start {provider} OAuth
        </a>
        <p className="text-xs text-slate-400">
          After approval you will receive a code. Paste it below to mint a temporary session token.
        </p>
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="Paste OAuth code here"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        <button
          className="w-full rounded-lg bg-accent px-3 py-2 font-semibold text-slate-900"
          onClick={handleFinishOAuth}
        >
          Exchange code for session token
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs text-slate-400">Prefer PATs or API keys? Paste them here instead.</p>
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="GitHub PAT or Google API key"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
        <button
          className="w-full rounded-lg border border-primary px-3 py-2 font-semibold text-primary"
          onClick={handleApiToken}
        >
          Validate and save token
        </button>
      </div>

      {message && <p className="mt-3 rounded-lg bg-slate-800/60 p-3 text-xs text-emerald-300">{message}</p>}
    </div>
  );
}

export default AuthConnector;
