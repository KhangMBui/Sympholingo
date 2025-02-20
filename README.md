# Sympholingo 🎵🌍

🏆 **CrimsonCode Hackathon 2025 Double Winner**  
**Best GenAI Hack 🥇** & **2nd Main Track Winner 🥈**

[![Devpost Submission](https://img.shields.io/badge/Devpost-View%20Project-blue)](https://devpost.com/software/sympholingo)

An AI-powered language learning app that teaches grammar and vocabulary through **original music**, leveraging OpenAI for translations/analysis and Suno AI for song generation.
<img src='![image](https://github.com/user-attachments/assets/22ba7612-d059-433d-bfb3-b57b3115929a)' />

## ✨ Features

- 🎸 **Custom Song Generation**: Creates original songs in your target language (any genre!)
- 🔍 **Grammar Breakdown**: Line-by-line analysis of lyrics with subjects/verbs/objects
- 🌐 **Bilingual Lyrics**: Side-by-side view of translated lyrics (native ↔ target language)
- 🔊 **Audio Playback**: Listen to your AI-generated song while learning
- 🧠 **Interactive Learning**: Focus on specific grammar concepts from the generated song

## 🚀 How It Works

1. User inputs:
   - **Target language** they want to learn
   - **Native language**
   - **Preferred music genre**
2. Backend:
   - Generates original song via **Suno API**
   - Translates lyrics via **OpenAI GPT-4**
   - Creates grammar analysis via **OpenAI**
3. Frontend:
   - Displays bilingual lyrics
   - Interactive grammar highlights
   - Audio player for generated song

## 🛠️ Technologies

**Frontend**  
- React.js + Vite

**Backend**  
- Express.js
- OpenAI API (GPT-4)
- Suno API

**DevOps**  
- Vite Build System
- CORS Management
- Environment Configuration

## 🏆 Hackathon Achievements

Won **two major prizes** at CrimsonCode 2025:
1. **Best GenAI Hack 🥇** - Top AI-powered project
2. **Main Track Winner 🥈** - Best overall hack of 150+ teams

Judges praised our novel integration of music generation with language learning pedagogy.

## ⚙️ Installation

**1. Clone Repository**
```bash
git clone https://github.com/KhangMBui/Sympholingo.git
cd sympholingo
```

**2. Run the app**
In the root directory:
```bash
npm run start
```
This will run both the backend and the frontend.

In ./backend/src/suno-api:
```bash
npm run dev
```
This will run the SunoAI

## 🎮 Usage
Run
Run the app and enter 3 fields:
1. Target language (e.g., Spanish)
2. Native language (e.g., English)
3. Music genre (e.g., Reggaeton)
Click "Generate Song" and watch the magic happen!


## 📄 License
MIT License - see LICENSE file

Made with ❤️ by **Sympholingo** at **CrimsonCode 2025**
Special thanks to Suno AI & OpenAI for their APIs!
