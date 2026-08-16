# 🌍 TravelGenius - Next-Gen AI Travel Assistant & Destination Guide

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/MUI-v6.4-007FFF.svg)](https://mui.com/)
[![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-8E75FF.svg)](https://deepmind.google/technologies/gemini/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000.svg)](https://travelgenius.vercel.app/)

**TravelGenius** is a modern, stylish, and intelligent web application designed for travelers worldwide. Powered by Google Gemini AI, interactive Google Maps, real-time weather forecasts, and rich destination data (restaurants, luxury accommodations, tourist attractions), TravelGenius delivers bespoke travel itineraries and handpicked local recommendations.

---

## ✨ Features & Highlights

- **✨ AI Travel Concierge**: Step-by-step interactive trip planner powered by Google Gemini AI. Select city, duration, budget, and vibe to generate custom day-by-day itineraries with exportable Markdown files.
- **🎨 Glassmorphic Slate Design**: Built with custom Material-UI (v6) theme tokens, Plus Jakarta Sans typography, high-contrast dark/light glass card overlays, and subtle micro-animations.
- **🗺️ Interactive Map Exploration**: Dark/Silver styled custom Google Map with live place markers, thumbnail previews, rating badges, and smooth panning.
- **🔍 Smart Search & Destination Presets**: Direct city search bar with quick preset tags for top travel hubs (Paris, Tokyo, New York, Bali, Dubai, London).
- **❤️ Saved Wishlist Drawer**: Slide-over wishlist drawer persisting your favorite restaurants and hotels locally using `localStorage`.
- **🌤️ Live Weather Metrics**: Real-time temperature, condition icons, humidity, wind speed, and feels-like temperature.
- **🚀 Complete SEO Optimization**: Full OpenGraph, Twitter Cards, Schema.org JSON-LD structured data, Web App Manifest, `robots.txt`, and `sitemap.xml` for Google Search ranking.

---

## 🛠️ Technology Stack

- **Core Framework**: React 18
- **UI & Styling**: Material-UI (v6), Emotion, Glassmorphic Vanilla CSS
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
- **Maps & Weather**: Google Maps API, OpenWeatherMap API, RapidAPI Travel Advisor
- **State & Persistence**: React Hooks, `localStorage`
- **Deployment**: Vercel & Vercel Analytics

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BhaskarAcharjee/TravelGenius.git
   cd TravelGenius
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
   REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
   REACT_APP_OPENWEATHERMAP_KEY=your_openweathermap_key
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run Locally:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 👨‍💻 Developer & Credits

Crafted with ❤️ by **[Bhaskar Acharjee](https://bhaskaracharjee.vercel.app/)**
- Website: [bhaskaracharjee.vercel.app](https://bhaskaracharjee.vercel.app/)
- GitHub: [@BhaskarAcharjee](https://github.com/BhaskarAcharjee)
- LinkedIn: [Bhaskar Acharjee](https://www.linkedin.com/in/bhaskar-acharjee/)
- Twitter: [@_bha_s_kar_](https://twitter.com/_bha_s_kar_)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.