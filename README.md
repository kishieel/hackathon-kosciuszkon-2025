# 🌿 LeafLit – Environmental Awareness & Action App

**LeafLit** is a mobile app built with React Native + Expo to promote environmental awareness and encourage sustainable habits through learning, journaling, and real-world engagement. Designed for students and eco-conscious users, the app gamifies good behavior with points and rewards.

---

## 🌱 Core Features

### 📖 Educational Section
- Browse short lessons on nuclear energy, long-term energy storage, and more
- Interactive content with quizzes to reinforce learning and educate
- Earn GreenPoints for completing lessons and participating in events

### 📝 Journal
- Log daily transportation choices (car, bike, walk, public)
- Record diet and personal eco-reflections

### 🛍️ GreenPoint Shop
- Spend earned points in a virtual store
- Redeem rewards like digital badges, tips, or partner discounts

### 📊 Stats & Insights
- View overall statistics based on you choices

### 📆 External Events Feed
- Discover local or global eco-events, challenges
- Events can be linked to extra point bonuses
- Curated list from internal or external sources (manual or via future API integration)

---

## 📲 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) installed on your phone

### Setup Instructions

```bash
git clone https://github.com/kishieel/hackathon-kosciuszkon-2025
cd hackathon-kosciuszkon-2025
npm install
npx expo start
```

### App Structure

```
/hackathon-kosciuszkon-2025
├── /app
│   ├── (tabs)
│       ├── _layout.tsx                 # navigation bar layout
│       ├── educational.tsx             # homepage for educational content
│       ├── events.tsx                  # event hub
│       ├── journal.tsx                 # your personal confession space
│       ├── quiz.tsx                    # test your knowledge
│       ├── shop.tsx                    # exchange green points for rewards
│       └── stats.tsx                   # keep track of your activities
│   ├── data
│       └── data.json                   # data used in stats page
│   ├── pages
│       ├── /educational                # educational materials
│       └── /news                       # news materials
│   └── styles                          # defaults for screen layouts
├── /components                         # default UI elements
├── /constants                          # color definitions
├── /data
│   └── data.ts                         # news data used in the news section
└── /hooks                              # default hooks

```
