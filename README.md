## 🎞️ Nexa Canvas

Nexa Canvas is an immersive media gallery that combines timeless visuals with seamless offline accessibility. Dive into a captivating journey through a harmonious collection of images and videos.

### 🔍 Features

- **Media Gallery:** Explore a vast collection of images and videos sourced from Pixabay.
- **Offline Access:** Download your favorite media items for offline viewing anytime, anywhere.
- **Download List:** Manage and revisit your downloaded media with ease using the dedicated download list page.
- **Responsive Design:** Enjoy a consistent and user-friendly experience across various devices.

### ⛏️ Tech Stack

- [ ] React.js
- [ ] Tailwind CSS
- [ ] IndexedDB
- [ ] Dexie.js
- [ ] Vite PWA
- [ ] TanStack Query
- [ ] Pixabay API

### 🌐 Project Purpose

This project was created as a personal exploration and practice exercise in building Progressive Web Applications (PWAs) and utilizing IndexedDB for offline data storage.

### 🚧 Known Issues

CORS Issue with Pixabay API for Videos

Currently, there is a CORS (Cross-Origin Resource Sharing) issue when fetching videos from Pixabay, preventing their storage in IndexedDB for offline access. While images can be seamlessly downloaded and accessed offline, videos may not be playable in the offline mode due to this limitation. Efforts were made to address this issue, but it remains unresolved.

### 🚀 Usage

1. Browse the media gallery and explore the captivating visuals.
2. Download your favorite images and videos for offline access.
3. Visit the download list page to manage and revisit your downloaded media.

### 💻 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/nexa-canvas.git
```

2. Install dependencies:

```
cd nexa-canvas
npm install
```

3. Run the development server:

```
npm run dev
```
