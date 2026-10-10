# Astro Starter Kit: Basics

## Contact form deployment

The Vercel Function at `/api/contact` requires these Production environment variables:

- `RESEND_API_KEY`: server-only Resend API key.
- `CONTACT_FROM`: sender on the verified `cleangopuntacana.com` domain.
- `CONTACT_TO`: destination mailbox.

Do not expose the key to Astro public environment variables or copy the Production key into Preview/local environments. For an end-to-end Preview test, create a separate restricted Resend key and sender, point `CONTACT_TO` to a controlled test mailbox, and remove those Preview-only values afterward.

The endpoint validates request size, origin, fields, a honeypot, minimum completion time, and Resend idempotency. These controls are complemented by a Vercel Firewall rate-limit rule, configured manually for `/api/contact` with a fixed window of 5 requests per 600 seconds per source IP and HTTP 429 responses. The rule applies to requests for that path regardless of HTTP method. The configuration is managed in Vercel, not in this repository, and must be checked after infrastructure changes.

Operational/legal items still requiring confirmation before publication: who monitors contact and privacy requests; the retention period for enquiries; applicable legal bases, rights, response periods, and authority; and the relevant Vercel, Resend, and Google contracting entities, transfer mechanisms, and safeguards.

```sh
pnpm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
