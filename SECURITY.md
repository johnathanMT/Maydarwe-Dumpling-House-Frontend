# Security

## Reporting a problem

Please report security problems privately, not in a public issue. Contact
details are in [`/.well-known/security.txt`](https://maydarwedumpling.com/.well-known/security.txt)
(Messenger or phone). Please do not place real orders or call staff to test.

## What this site handles

The website is a static React app served from Vercel's CDN. It has **no forms,
no backend, no user accounts, no API keys and no payments**. Orders leave the
site through Messenger, Grab, foodpanda or a phone call; the site never
receives a customer's name, address or payment details. The only data the
browser keeps is the cart and the language choice (localStorage), both
validated when read.

If online ordering or payment is ever added to the site itself, it must run in
server-side functions: prices recalculated on the server, every input validated,
Cloudflare Turnstile + a honeypot field + rate limiting on the endpoint, and no
personal data in logs.

## Protections in the code

| Layer | Where | What it does |
|---|---|---|
| Content-Security-Policy | `src/lib/securityHeaders.js` → `vercel.json` | Scripts and styles only from this site, no inline or eval, no forms, no framing, only two named third-party origins (Cloudinary, Google Maps embed). |
| Trusted Types | CSP + `src/lib/trustedTypes.js` | The browser refuses to turn strings into HTML or script. Worker scripts only from this origin. |
| Other headers | same | HSTS (1 year, preload), nosniff, frame DENY, strict referrer, COOP/CORP, Permissions-Policy turning off unused features. |
| Security tripwires | `scripts/check-security.mjs` (before every build, and in CI) | Fails if the CSP loses a protection or gains an origin, if an ordering link is not https on an approved host, or if robots.txt stops blocking AI training crawlers. |
| XSS lint rules | `eslint.config.js` | Bans `dangerouslySetInnerHTML`, `innerHTML`/`outerHTML`, `insertAdjacentHTML`, `document.write`, `javascript:` URLs, `eval`, and `target="_blank"` without `rel`. |
| Deploy-output scan | `scripts/scan-dist.mjs` (after every build) | Fails if `dist/` contains anything that looks like a secret, a source map, or an inline script. |
| Crawler policy | `public/robots.txt` | AI training crawlers disallowed; AI search/assistant fetchers and search engines allowed; `/api/internal/` is a bot trap. |
| Security contact | `/.well-known/security.txt` (generated at build from `site.js`) | RFC 9116 contact file; its expiry date renews on every deploy. |
| Supply chain | `.github/workflows/main.yml`, `.github/dependabot.yml` | Actions pinned to commit SHAs and tools pinned by version or image digest, read-only token, install without lifecycle scripts, npm signature check, `npm audit` + OSV-Scanner (also flags known-malicious packages), TruffleHog secret scan, weekly Dependabot updates with a 5-day cooldown. |
| Code scanning | `main.yml` (Semgrep), `codeql.yml` (CodeQL, public repos) | JavaScript/React security rules, hard-coded secrets, and injection in the CI workflows themselves, on every pull request. |
| Regression tests | `tests/e2e/` (Playwright, in CI) | Every page is loaded under the production CSP and Trusted Types; the test fails on any CSP violation, console error or request to an unapproved origin. |

Environment variables: Vite only exposes names starting with `MAYDARWE_PUBLIC_`,
and everything it exposes is public. Never put a secret in one.

## Vercel Firewall (Hobby plan)

Hobby allows 3 custom rules (1 of them may be a rate limit). They are set in
the dashboard (Project → Firewall → Rules), in this order:

1. **Trap and scanner paths** → Deny. Request Path starts with `/api/internal`,
   `/.env`, `/.git`, `/wp-`, `/phpmyadmin`, or ends with `.php` (conditions joined with OR).
2. **AI training crawlers** → Deny. User Agent contains `GPTBot`, `ClaudeBot`,
   `anthropic-ai`, `CCBot`, `Meta-ExternalAgent`, `FacebookBot`, `Bytespider`,
   `cohere-training-data-crawler`, `Diffbot`, `ImagesiftBot`, `Omgilibot`,
   `Timpibot`, `PanguBot` (OR). Enforces robots.txt for crawlers that ignore it.
3. **Rate limit page requests** → Rate limit, fixed window 60 s, 60 requests,
   keys IP + JA4 digest, Request Path does not start with `/assets/`. Log for a
   week, then Challenge.

Managed rulesets: **Bot Protection** Log for a week, then Challenge (verified
bots such as Googlebot are never challenged). **AI Bots** on Log only: Deny
would also block the AI search fetchers we allow.

Under attack: Firewall → Bot Management → **Attack Mode** → Enable (free on all
plans; search engines still get through). Turn it off when traffic is normal.
