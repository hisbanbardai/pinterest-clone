# Pinterest Clone (Mini Subset)

This project is a **mini subset of Pinterest** built to practice and showcase full-stack development skills.  
Users can:

- Register and log in with **JWT authentication + cookies**
- Create pins (images stored on **ImageKit**)
- Save pins created by others
- Follow other users
- Search pins by title

The project is structured as a **Turborepo monorepo** containing:

- **Frontend:** React
- **Backend:** Express
- **Shared Package:** Zod schemas for validation (used in both frontend and backend)

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Express
- **Database ORM:** Prisma
- **Monorepo Management:** Turborepo
- **Database:** PostgreSQL
- **Validation:** Zod (shared package)
- **Authentication:** JWT + Cookies
- **Image Storage:** ImageKit
- **Package Manager:** npm / yarn

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. Install Dependencies

Since this project uses Turborepo, you can install dependencies for all apps and packages from the root:

```bash
npm install
```

3. Environment Variables

Create .env files in both apps/frontend and apps/backend with the required environment variables. Example:

apps/backend/.env

```bash
PORT=3000
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-secret>
IMAGEKIT_PUBLIC_KEY=<your-imagekit-public-key>
IMAGEKIT_PRIVATE_KEY=<your-imagekit-private-key>
IMAGEKIT_URL_ENDPOINT=<your-imagekit-url-endpoint>
```

apps/frontend/.env

```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_IK_URL_ENDPOINT=<your-imagekit-url-endpoint>
```

4. Run Database Migrations

Before starting the backend, run Prisma migrations:

```bash
npx prisma migrate dev
```

You can also open Prisma Studio to explore your database:

```bash
npx prisma studio
```

5. Run the Apps

From the root of the project, run:

```bash
npm run dev
```

This will start both frontend and backend concurrently.

Frontend runs on: http://localhost:5173 (Vite default)

Backend runs on: http://localhost:3000
