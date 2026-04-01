# Chen Zexing's Cyberpunk Portfolio

A modern, dark-themed portfolio website with cyberpunk aesthetics, glassmorphism effects, parallax scrolling, and Bento Box project layout inspired by Apple's design philosophy.

## 🎨 Design Features

- **Deep Dark Mode**: Sophisticated dark background (#0a0a0a) with neon purple accents (#a855f7)
- **Glassmorphism Effects**: Semi-transparent cards with blur effects for depth and elegance
- **Breathing Light Animation**: Subtle purple glow effects on interactive elements
- **Parallax Scrolling**: Dynamic background movement as you scroll
- **Bento Box Layout**: Irregular grid layout for project showcase
- **Smooth Animations**: Fade-in effects and hover interactions
- **Responsive Design**: Mobile-first approach with full responsiveness

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + Custom CSS animations
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Poppins & Geist (Google Fonts)

## 📋 Sections

1. **Hero Section**: Eye-catching introduction with parallax background
2. **About**: Personal introduction and background
3. **Experience**: Work history and professional roles
4. **Education**: Academic background and achievements
5. **Skills**: Technical and professional competencies
6. **Projects**: Featured work in Bento Box layout
7. **Contact**: Social links and contact information

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📦 Project Structure

```
portfolio-cyberpunk/
├── client/
│   ├── public/          # Static files (favicon, robots.txt)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── App.tsx      # Main app component
│   │   ├── main.tsx     # React entry point
│   │   └── index.css    # Global styles & theme
│   └── index.html       # HTML template
├── server/              # Express server (static deployment)
├── package.json         # Project dependencies
└── README.md            # This file
```

## 🎯 Key Components

### Color Palette
- **Background**: #0a0a0a (Deep Black)
- **Primary**: #a855f7 (Neon Purple)
- **Text**: #f5f5f5 (Off White)
- **Accent**: #1a1a1a (Dark Gray)

### Animations
- **Breathing Light**: Continuous subtle glow on cards
- **Fade In**: Elements animate in as they enter viewport
- **Hover Effects**: Cards lift and glow on hover
- **Parallax**: Background moves slower than foreground

## 🌐 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site available at: `https://chenzx060115-commits.github.io/Eastar-s-FOMO/`

### Manual Deployment

```bash
# Build the project
pnpm build

# The dist/public folder is ready for deployment
```

## 📝 Customization

### Update Personal Information
Edit `client/src/pages/Home.tsx` to update:
- Name and title
- About section
- Experience entries
- Education details
- Skills
- Projects
- Contact information

### Modify Theme
Edit `client/src/index.css` to customize:
- Color palette (CSS variables)
- Animation timing
- Glassmorphism effects
- Font families

### Add New Sections
1. Create new component in `client/src/components/`
2. Import and add to `client/src/pages/Home.tsx`
3. Update navigation links

## 🔗 Links

- **GitHub**: https://github.com/chenzx060115-commits/Eastar-s-FOMO
- **Portfolio**: https://chenzx060115-commits.github.io/Eastar-s-FOMO/

## 📧 Contact

- **Email**: CZX_060115@QQ.COM
- **Phone**: 15013696224

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 🙏 Acknowledgments

- Design inspiration from Apple's minimalist aesthetic
- Cyberpunk aesthetic from modern tech design trends
- Built with React, Tailwind CSS, and modern web technologies
