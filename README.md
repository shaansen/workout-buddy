# Workout Buddy 💪

A mobile-friendly React app for tracking your daily workout progress. Mark sets as you complete them and see your weekly schedule at a glance.

**Live Demo**: [https://shaansen.github.io/workout-buddy/](https://shaansen.github.io/workout-buddy/)

## Features

- 📅 **Weekly Schedule View**: See all your workouts for the week
- ✅ **Set Tracking**: Mark individual sets as complete for each exercise
- 📊 **Progress Tracking**: Visual progress bars show your completion status
- 📈 **Weekly Consistency**: Track your workout consistency across weeks
- 💪 **Animated Stick Figures**: Interactive SVG stick figure animations for each exercise
- 💾 **Local Storage**: Your progress is saved automatically
- 📱 **Mobile-Friendly**: Optimized for native app-like experience on mobile devices

## Weekly Schedule

- **Monday**: Upper Push
- **Tuesday**: Lower & Core
- **Wednesday**: Yoga
- **Thursday**: Upper Pull
- **Friday**: Yoga
- **Saturday**: Full Body
- **Sunday**: Yoga/Rest

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push your code to a GitHub repository
2. Go to Settings → Pages in your GitHub repository
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy when you push to the `main` branch

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

**Note**: The base path in `vite.config.js` is set to `/workout-buddy/` to match the repository name.

## Usage

1. **View Schedule**: The home page shows your weekly workout schedule
2. **Select a Day**: Tap on any day to see the exercises for that workout
3. **View Exercise Demos**: Tap "Show Exercise Demo" to see animated stick figure demonstrations
4. **Mark Sets**: Tap on each set button to mark it as complete
5. **Track Progress**: See your progress bar update as you complete sets
6. **View Stats**: Click "📊 Stats" to see your weekly consistency
7. **Your Progress is Saved**: All progress is automatically saved to your browser's local storage

## Exercise Animations

The app includes animated SVG stick figures for each exercise to help you learn proper form. All animations are:

- **Self-contained**: No external dependencies or files needed
- **Lightweight**: SVG-based animations are small and fast
- **Customizable**: Easy to modify in `src/data/exerciseAnimations.js`
- **Animated**: CSS animations show the movement pattern for each exercise

### Customizing Animations

You can customize the stick figure animations by editing `src/data/exerciseAnimations.js`. Each exercise has:
- Body position angles
- Arm and leg positions
- Animation type (squat, press, curl, etc.)
- Equipment visualization (weights, bench, box)

The stick figures are rendered using the `StickFigure` component in `src/components/StickFigure.jsx`.

## Technology Stack

- React 19
- React Router DOM
- Vite
- CSS3 (Mobile-first responsive design)

## License

MIT
