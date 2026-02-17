## Weather Application Using React

A modern, responsive weather dashboard built with React, Vite, Tailwind CSS, and the OpenWeatherMap API. Search for any city to view current conditions, a 5-day forecast, and quickly revisit recent searches.

### Features

- **Current Weather**
  - City search
  - Temperature and "feels like"
  - Humidity, pressure, wind speed
  - Sunrise and sunset times
  - Weather description and icon

- **5-Day Forecast**
  - Daily forecast cards
  - Min/max temperatures
  - Weather description and icon

- **Weather History**
  - Stores the last 5 searched cities in `localStorage`
  - Click any recent city to reload its weather
  - Clear history option

- **UI / UX**
  - Modern Tailwind-powered dashboard
  - Responsive layout (mobile, tablet, desktop)
  - Loading spinner
  - Error handling and messages

---

### Screenshots

_Add screenshots of the dashboard here once you have the app running and styled:_

- `./screenshots/home-desktop.png`
- `./screenshots/home-mobile.png`

---

### Tech Stack

- **React** (with Vite)
- **Axios** for HTTP requests
- **React Hooks** for state management
- **Tailwind CSS** for styling
- **Environment variables** for API keys
- **LocalStorage** for search history

---

### Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

#### 2. Install dependencies

```bash
npm install
```

---

### Environment Variables

This project uses the OpenWeatherMap API. You must configure the API key via environment variables.

1. Create a free account at `https://openweathermap.org/`
2. Generate an API key
3. Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

4. Edit `.env` and set your key:

```bash
VITE_WEATHER_API_KEY=YOUR_REAL_API_KEY
```

> **Important:** Never commit your real `.env` file or API keys to Git.

---

### Running the App Locally

Start the development server:

```bash
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`) in your browser.

---

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

### Deployment

You can deploy this Vite app easily to Vercel or Netlify.

#### Deploy to Vercel

1. Push your repository to GitHub
2. Go to `https://vercel.com/` and import your GitHub repo
3. Set the build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In the Vercel project settings, add the environment variable:
   - `VITE_WEATHER_API_KEY=YOUR_REAL_API_KEY`
5. Redeploy the project so the environment is picked up.

#### Deploy to Netlify

1. Push your repository to GitHub
2. Go to `https://app.netlify.com/` and create a new site from Git
3. Configure the build:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
4. In "Site settings" → "Environment variables", add:
   - `VITE_WEATHER_API_KEY=YOUR_REAL_API_KEY`
5. Trigger a deploy.

---

### Folder Structure

```text
weather-app/
  public/
  src/
    components/
      SearchBar.jsx
      WeatherCard.jsx
      Forecast.jsx
      WeatherHistory.jsx
      Loader.jsx
      ErrorMessage.jsx
    services/
      weatherService.js
    hooks/
      useWeather.js
    pages/
      Home.jsx
    styles/
      index.css
    App.jsx
    main.jsx
  .env.example
  .gitignore
  package.json
  README.md
  index.html
  vite.config.js
  tailwind.config.cjs
  postcss.config.cjs
```

- **`src/components/`**: Reusable UI components (search bar, cards, history, loader, error).
- **`src/services/`**: Service layer for API calls (OpenWeatherMap).
- **`src/hooks/`**: Custom React hooks for managing weather state and side effects.
- **`src/pages/`**: Page-level components (e.g., `Home`).
- **`src/styles/`**: Global styles and Tailwind entrypoint.
- **`App.jsx`**: Root component wiring pages.
- **`main.jsx`**: React entry point that mounts the app.
- **`index.html`**: HTML shell used by Vite.
- **`.env.example`**: Example env file showing required environment variables.

---

### Notes

- All API logic is isolated in the `services` layer and the `useWeather` hook.
- UI components remain presentational and reusable.
- LocalStorage is used only for lightweight search history (no sensitive data).

