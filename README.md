# Gaurav Singh - Portfolio

A modern, responsive portfolio website built with React, showcasing my skills, projects, and experience as a Research Engineer and Full-Stack Developer.

## 🚀 Live Demo

[View Portfolio](https://your-portfolio-url.com)

## ✨ Features

- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive 3D Elements** - Three.js integration for visual appeal
- **Mobile-First Navigation** - Burger menu for smaller screens
- **Smooth Scrolling** - Seamless navigation between sections
- **Contact Form** - Functional contact form with email integration

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Three.js** - 3D graphics and animations

### 3D Graphics

- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📱 Sections

### Hero Section

- Personal introduction with animated text
- Profile image with 3D background
- Call-to-action buttons
- Responsive layout (mobile-first)

### Skills Section

- Technical skills displayed as interactive tags
- Coding profiles (GeeksForGeeks, Leetcode, HackerRank, Code Studio)
- Full image display for coding platforms

### Projects Section

- Showcase of 8+ projects with real images
- Technology stack indicators
- Live project links
- Hover effects and animations

### Education & Experience

- Academic background (B.Tech, Diploma)
- Professional experience at IDEMIA
- Clean card-based layout

### Contact Section

- Contact form with validation
- Personal information display
- Email integration
- Social media links

## 🎨 Design Features

### Responsive Design

- **Mobile-First Approach** - Optimized for mobile devices
- **Flexible Grid System** - Adapts to all screen sizes
- **Touch-Friendly Interface** - Large touch targets for mobile

### Animations

- **Framer Motion** - Smooth page transitions and micro-interactions
- **Staggered Animations** - Elements animate in sequence
- **Hover Effects** - Interactive feedback on user actions

### Theme System

- **Dark/Light Mode** - Toggle between themes
- **Persistent Preferences** - Saves theme choice in localStorage
- **Smooth Transitions** - Color changes are animated

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/264Gaurav/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── projects/          # Project images
│   │   ├── Gaurav_DP.jpeg     # Profile picture
│   │   └── *.png              # Coding platform logos
│   ├── components/
│   │   ├── Header.jsx         # Navigation component
│   │   ├── Hero.jsx           # Hero section
│   │   ├── Projects.jsx       # Projects showcase
│   │   ├── SkillCloud.jsx     # Skills and coding profiles
│   │   ├── Education.jsx      # Education & experience
│   │   ├── Contact.jsx        # Contact form
│   │   ├── Footer.jsx         # Footer component
│   │   └── Chatbot.jsx        # Interactive chatbot
│   ├── context/
│   │   └── ThemeContext.jsx   # Theme management
│   ├── three/
│   │   └── ThreeLogo.jsx      # 3D background component
│   ├── utils/
│   │   └── qa.js              # Chatbot Q&A data
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
└── README.md                  # Project documentation
```

## 🎯 Key Features Implementation

### Theme Switching

- Context API for global state management
- localStorage for persistence
- CSS custom properties for dynamic theming

### Responsive Navigation

- CSS Grid for layout control
- Media queries for breakpoints
- Animated burger menu for mobile

### 3D Integration

- Three.js for 3D graphics
- React Three Fiber for React integration
- Orbit controls for interaction

### Form Handling

- React state management
- Email integration via mailto
- Form validation

## 🔧 Customization

### Adding New Projects

1. Add project image to `src/assets/projects/`
2. Update `sampleProjects` array in `Projects.jsx`
3. Include project details, links, and tech stack

### Updating Skills

1. Modify `skills` array in `SkillCloud.jsx`
2. Add new coding profiles as needed
3. Update profile images in assets

### Styling Changes

1. Modify Tailwind classes in components
2. Update `tailwind.config.js` for custom configurations
3. Edit `index.css` for global styles

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: gauravsingh264209@gmail.com
- **LinkedIn**: [Gaurav Singh](https://www.linkedin.com/in/gaurav-singh-4b612925b/)
- **GitHub**: [264Gaurav](https://github.com/264Gaurav)

---

**Built with ❤️ by Gaurav Singh**
