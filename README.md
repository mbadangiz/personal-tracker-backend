# Work Tracker Backend

NestJS backend for a personal work-tracking application. The current codebase provides authentication, JWT-protected routes, file upload handling, i18n responses, Swagger documentation, and a TypeORM domain model for todos, projects, time logs, notes, profiles, storage, and personal finance records.

## Features

- User registration and login with bcrypt password hashing
- JWT authentication with Passport
- Swagger API documentation at `/docs`
- Global validation pipe with consistent error responses
- Persian and English i18n resources for upload and validation messages
- Single and multiple file uploads with per-type extension policies
- SQL.js/SQLite persistence through TypeORM
- Domain entities for:
  - users and profiles
  - todos, projects, tags, attachments, and time logs
  - notes and note tags
  - financial accounts, transactions, currencies, categories, and transfers

## Tech Stack

- Node.js + TypeScript
- NestJS 11
- TypeORM 0.3
- SQL.js with `database.sqlite`
- Passport JWT
- bcrypt
- Multer
- nestjs-i18n
- Swagger/OpenAPI
- pnpm

## Requirements

- Node.js 20+ recommended
- pnpm

## Environment Variables

Create a `.env` file in the project root:

```env
JWT_SECRET=replace-with-a-long-random-secret
```

`JWT_SECRET` is required. The application fails during startup if it is missing.

## Installation

```bash
pnpm install
```

## Running The App

```bash
# Development
pnpm run start:dev

# Regular start
pnpm run start

# Production build
pnpm run build
pnpm run start:prod
```

By default the app listens on port `3000`.

Useful URLs:

- API root: `http://localhost:3000/`
- Swagger docs: `http://localhost:3000/docs`

## API Overview

### Auth

| Method | Path                    | Description              |
| ------ | ----------------------- | ------------------------ |
| `POST` | `/auth/create-new-user` | Register a new user      |
| `POST` | `/auth/login`           | Login and receive a JWT  |
| `POST` | `/auth/oo`              | Test protected JWT route |

Registration body:

```json
{
  "username": "demo_user",
  "email": "demo@example.com",
  "password": "secret123",
  "phoneNumber": "09123456789"
}
```

Login body:

```json
{
  "usernameOrEmailOrPhone": "demo_user",
  "password": "secret123"
}
```

Protected requests use a bearer token:

```http
Authorization: Bearer <token>
```

### File Storage

| Method | Path                                       | Description                            |
| ------ | ------------------------------------------ | -------------------------------------- |
| `POST` | `/file-storage/single-upload?type=general` | Upload one file in field `file`        |
| `POST` | `/file-storage/multi-upload?type=general`  | Upload multiple files in field `files` |

Supported upload `type` values:

| Type         | Allowed extensions                                                                | Policy limit   |
| ------------ | --------------------------------------------------------------------------------- | -------------- |
| `avatar`     | `.jpg`, `.jpeg`, `.png`, `.webp`                                                  | 1 MB, 1 file   |
| `attachment` | `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`, `.xlsx`, `.xls`, `.txt`, `.zip` | 50 MB, 5 files |
| `video`      | `.mp4`, `.mov`, `.avi`, `.mkv`, `.webm`                                           | 500 MB, 1 file |
| `general`    | `.jpg`, `.jpeg`, `.png`, `.pdf`, `.mp4`, `.mp3`                                   | 20 MB, 5 files |

Uploaded files are stored in `./uploads`.

## Internationalization

The app loads translations from `src/i18n` and falls back to Persian (`fa`). Language can be selected with:

- `?lang=en` query parameter
- `lang` header
- `Accept-Language` header

Swagger also documents an optional `accept-language` header.

## Database

The project currently uses TypeORM with SQL.js:

- Database file: `database.sqlite`
- Entity discovery: `src/**/*.entity.ts` and compiled `dist/**/*.entity.js`
- `synchronize: true` is enabled for development convenience

For production, consider disabling `synchronize` and replacing it with migrations.

## Project Structure

```text
src/
  api/
    auth/                 # Auth controller, module, service
    file-storage/         # Upload endpoints
  application/
    dto/                  # Request DTOs
    policy/               # Upload policies
  config/                 # Global Nest config module
  dataAccess/             # TypeORM database module
  decorators/             # Upload Swagger/interceptor decorators
  domain/
    abstracts/            # Base entity and shared response interfaces
    entities/             # TypeORM entities
  guards/                 # JWT auth guard
  i18n/                   # fa/en translation files
  interceptors/           # Multer upload interceptors
  lib/                    # Swagger and validation bootstrap helpers
  strategies/             # Passport JWT strategy
  utils/                  # Upload validation helpers
```

## Scripts

```bash
pnpm run build       # Compile the Nest application
pnpm run start       # Start once
pnpm run start:dev   # Start in watch mode
pnpm run start:prod  # Run compiled dist/main
pnpm run lint        # Run ESLint with auto-fix
pnpm run format      # Format src and test TypeScript files
pnpm run test        # Run unit tests
pnpm run test:cov    # Run tests with coverage
pnpm run test:e2e    # Run e2e tests
```

## Development Notes

- Keep `.env`, `database.sqlite`, `uploads/`, `dist/`, and `node_modules/` out of commits.
- The current API surface is small compared with the domain model; many entities are ready for future modules but do not yet have controllers/services.
- Upload policy metadata includes max size/count, but the current validators should be checked before relying on those limits in production.
- CORS is currently open to all origins in `src/main.ts`; restrict it before public deployment.
