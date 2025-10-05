# Planetary Hours Calculator 🌟

A modern web application for calculating planetary hours based on traditional Chaldean astrology. Built with React, TypeScript, and Tailwind CSS, this app provides accurate astronomical calculations for timing magical and astrological practices.

## ✨ Features

### 🕐 Real-Time Planetary Hours
- **Live Current Hour Display**: Shows the active planetary hour with real-time updates
- **24-Hour Schedule**: Complete day and night planetary hours with precise timing
- **Visual Planet Indicators**: Each planet has its unique symbol and color coding
- **Time Remaining**: Countdown timer showing time left in current planetary hour

### 📍 Location-Based Calculations
- **Geolocation Support**: Automatically detect your current location
- **Manual Location Entry**: Enter custom coordinates for any global location
- **Quick City Presets**: One-click access to major cities (New York, London, Paris, Tokyo)
- **Accurate Sun Data**: Precise sunrise/sunset calculations based on your location

### 🌙 Traditional Chaldean System
- **Authentic Calculations**: Based on classical Chaldean astrology methods
- **Correct Planetary Sequence**: Saturn → Sun → Venus → Jupiter → Mercury → Mars → Moon
- **Day Rulers**: Proper assignment of planetary rulers for each day of the week
- **Variable Hour Length**: Day and night hours adjust to actual sunrise/sunset times

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Glassmorphism Effects**: Beautiful translucent design elements with backdrop blur
- **Dark Theme**: Easy on the eyes with purple/blue gradient backgrounds
- **Interactive Elements**: Smooth animations and hover effects

## 🪐 The Seven Classical Planets

Each planet governs specific qualities and energies:

| Planet | Symbol | Day | Qualities |
|--------|--------|-----|-----------|
| **Sun** ☉ | Sunday | Leadership, vitality, success, authority, creativity |
| **Moon** ☽ | Monday | Emotion, intuition, cycles, reflection, subconscious |
| **Mars** ♂ | Tuesday | Action, courage, conflict, energy, passion |
| **Mercury** ☿ | Wednesday | Communication, intellect, travel, commerce, versatility |
| **Jupiter** ♃ | Thursday | Expansion, luck, wisdom, abundance, optimism |
| **Venus** ♀ | Friday | Love, beauty, harmony, pleasure, relationships |
| **Saturn** ♄ | Saturday | Discipline, restriction, patience, wisdom, melancholy |

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/planetary-hours.git
   cd planetary-hours
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

## 🔧 Technical Stack

### Frontend Technologies
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for responsive design

### Key Libraries & Tools
- **Astronomical Calculations**: Custom sunrise/sunset algorithms
- **Geolocation API**: Browser-based location detection
- **Date/Time Handling**: Native JavaScript Date objects with timezone support

### Project Structure
```
src/
├── components/          # React components
│   ├── Card.tsx        # Reusable card component
│   ├── LocationForm.tsx # Location input and geolocation
│   ├── PlanetaryHourDisplay.tsx # Current hour display
│   ├── PlanetaryTable.tsx # Hours schedule table
│   └── Table.tsx       # Generic table component
├── types/              # TypeScript type definitions
│   └── index.ts        # Interfaces for planets, hours, locations
├── utils/              # Utility functions
│   ├── planets.ts      # Planet data and day rulers
│   ├── planetaryHours.ts # Main calculation logic
│   └── sunCalculations.ts # Astronomical calculations
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## 📖 How Planetary Hours Work

### Traditional Chaldean System
Planetary hours are based on the ancient Chaldean system where:

1. **Each day is ruled by a planet** based on the day of the week
2. **The first hour after sunrise** is ruled by that day's planetary ruler
3. **Hours follow a specific sequence**: Saturn → Sun → Venus → Jupiter → Mercury → Mars → Moon
4. **Day and night are divided into 12 hours each**, with variable length based on sunrise/sunset times

### Example Calculation
**For a Sunday in New York:**
- **Day Ruler**: Sun ☉
- **1st Hour** (sunrise): Sun ☉
- **2nd Hour**: Venus ♀
- **3rd Hour**: Jupiter ♃
- **4th Hour**: Mercury ☿
- **5th Hour**: Mars ♂
- **6th Hour**: Moon ☽
- **7th Hour**: Saturn ♄
- **8th Hour**: Sun ☉ (cycle repeats)
- ...continuing through all 24 hours

## 🌍 Supported Features

### Location Features
- ✅ Global location support (any latitude/longitude)
- ✅ Automatic geolocation detection
- ✅ Major city quick-select options
- ✅ Manual coordinate entry with validation
- ✅ Timezone detection and handling

### Calculation Features
- ✅ Accurate sunrise/sunset calculations
- ✅ Variable planetary hour lengths
- ✅ Real-time current hour detection
- ✅ Complete 24-hour schedule generation
- ✅ Next hour preview

### Display Features
- ✅ Current planetary hour highlighting
- ✅ Day/night hour separation
- ✅ Planet symbols and color coding
- ✅ Time remaining countdown
- ✅ Responsive table layout

## 🎯 Use Cases

### Astrological Timing
- **Spell Casting**: Choose appropriate planetary hours for magical work
- **Ritual Planning**: Time ceremonies based on planetary influences
- **Meditation**: Align practice with planetary energies

### Personal Development
- **Daily Planning**: Structure activities around planetary qualities
- **Goal Setting**: Use planetary hours for specific intentions
- **Mindfulness**: Become aware of natural cycles and timing

### Educational
- **Astrology Study**: Learn traditional planetary hour calculations
- **Historical Context**: Understand ancient timekeeping methods
- **Astronomical Education**: Explore sun cycles and seasonal changes

## 🔮 Planetary Hour Applications

### By Planet
- **Sun Hours** ☉: Leadership, success, authority, career matters
- **Moon Hours** ☽: Intuition, dreams, emotional work, family
- **Mars Hours** ♂: Action, courage, conflict resolution, sports
- **Mercury Hours** ☿: Communication, learning, travel, business
- **Jupiter Hours** ♃: Expansion, luck, wisdom, legal matters
- **Venus Hours** ♀: Love, beauty, art, relationships, pleasure
- **Saturn Hours** ♄: Discipline, structure, binding, banishing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Traditional Chaldean astrology methods
- Astronomical calculation algorithms
- Open source React and TypeScript communities
- Ancient wisdom keepers who preserved these timing systems

## 📚 Further Reading

- [Traditional Planetary Hours](https://en.wikipedia.org/wiki/Planetary_hours)
- [Chaldean Astrology](https://en.wikipedia.org/wiki/Babylonian_astrology)
- [Astronomical Calculations](https://en.wikipedia.org/wiki/Sunrise_equation)

---

*Built with ♥ using React, TypeScript, and Tailwind CSS*

**Live Demo**: [View Application](http://localhost:3000)