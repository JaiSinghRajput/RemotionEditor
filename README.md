# 🎬 E-Video Editor

A powerful, programmatic video editing platform built with [Next.js](https://nextjs.org/) and [Remotion](https://remotion.dev/). This project allows for dynamic video generation, background rendering, and scalable AWS Lambda deployments.

---

## 🚀 Features

- **Programmatic Video**: Create videos using React components.
- **Next.js App Router**: Modern web architecture for the editor interface.
- **Background Rendering**: Dedicated worker for processing video renders.
- **AWS Lambda Integration**: Scalable cloud rendering for production use.
- **TailwindCSS**: Beautiful and responsive UI for the editing suite.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (Recommended) or `npm` / `yarn`
- An AWS Account (if using Lambda rendering)

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/JaiSinghRajput/RemotionEditor.git
cd RemotionEditor
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Setup
Copy the example environment file and fill in your credentials:
```bash
cp .env.example .env
```
Key variables to configure:
- `GOOGLE_FONTS_API_KEY`: Required for fetching fonts from Google Fonts.
- `REMOTION_AWS_ACCESS_KEY_ID`: For AWS Lambda rendering.
- `REMOTION_AWS_SECRET_ACCESS_KEY`: For AWS Lambda rendering.

---

## 💻 Running the Application

This project consists of two main components: the **Next.js Server** and the **Background Render Worker**.

### Start the Server (Editor UI)
Runs the web interface where you can preview and configure videos.
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to see the editor.

### Start the Worker (Render Engine)
Runs the background process that handles video rendering jobs.
```bash
pnpm worker
```
*Note: Make sure your server is running or your job queue is configured so the worker can pick up tasks.*

---

## 🛠️ Commands Reference

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start Next.js development server. |
| `pnpm worker` | Start the background render worker. |
| `pnpm remotion` | Open Remotion Studio for template preview. |
| `pnpm build` | Create a production build of the Next.js app. |
| `pnpm start` | Start the production server. |
| `pnpm deploy` | Deploy the Remotion Lambda function & bundle to AWS. |
| `pnpm render` | Render the video template locally via CLI. |

---

## ☁️ AWS Lambda Rendering

To set up cloud rendering:
1. Ensure your `.env` has active AWS credentials.
2. Configure `config.mjs` with your desired region and settings.
3. Run the deployment script:
   ```bash
   pnpm deploy
   ```
This will set up the necessary S3 buckets and Lambda functions for remote rendering.

---

## 📄 License
NO LICENSE
