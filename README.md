# Cloudit

Cloudit is a web-based cloud storage application that allows users to sign up, log in, and manage their personal files and folders. Built with Node.js, Express, Prisma, and PostgreSQL, Cloudit offers a user-friendly interface for organizing and accessing files securely.

## 🚀 Features

- **User Authentication**: Secure sign-up and log-in functionality using Passport.js.
- **File Management**: Upload, download, and organize files into folders.
- **Folder Hierarchy**: Create nested folders to structure files effectively.
- **Session Management**: Persistent user sessions with PrismaSessionStore.
- **Database Integration**: Utilizes PostgreSQL with Prisma ORM for data management.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js
- **Database**: PostgreSQL, Prisma ORM, Cloudinary
- **Templating Engine**: EJS
- **Session Store**: PrismaSessionStore
- **Deployment**: Compatible with platforms like Vercel and Railway

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kk120306/Cloudit.git
   cd Cloudit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
   ```ini
   DATABASE_URL=your_postgresql_database_url
   SESSION_SECRET=your_session_secret
   ```

4. **Set up the database**:
   - Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```
   - Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. **Start the application**:
   ```bash
   npm start
   ```
   - The application will be running at `http://localhost:3000`.

## 📦 Deployment

Cloudit can be deployed on various platforms. For example:

### Deploying to Vercel

1. **Import the project**: Log in to Vercel and import your GitHub repository.
2. **Set environment variables**: In the Vercel dashboard, navigate to your project settings and add the required environment variables (`DATABASE_URL` and `SESSION_SECRET`).
3. **Build and deploy**: Vercel will automatically detect the project settings and deploy your application.

### Deploying to Railway

1. **Create a new project**: Log in to Railway and create a new project by linking your GitHub repository.
2. **Provision a PostgreSQL database**: Add a PostgreSQL plugin to your project.
3. **Set environment variables**: Railway will automatically set the `DATABASE_URL`. Add `SESSION_SECRET` manually in the environment variables section.
4. **Deploy**: Railway will build and deploy your application automatically.
