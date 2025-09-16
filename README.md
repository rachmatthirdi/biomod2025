# Research Platform

A comprehensive, fully responsive multi-page web application built with Next.js, TypeScript, and Tailwind CSS. This platform serves as a centralized hub for research activities, featuring dedicated sections for Ideas, ELSI (Ethical, Legal & Social Implications), Lab Notebook documentation, and Team information.

## Description

The Research Platform is designed to support every aspect of the research workflow, from initial idea conceptualization to team collaboration and ethical considerations. Each main page contains three distinct, scrollable sections that provide detailed information and functionality specific to that research area.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme Management**: next-themes

## Features

### Responsive Navigation Bar
- **Fixed Position**: Navbar remains visible at the top of all pages
- **Theme Toggle**: Icon button in the top-right corner for switching between light and dark modes
- **Theme Persistence**: User's theme choice is saved in localStorage
- **Desktop Navigation**: Horizontal display of all main navigation links
- **Mobile Navigation**: Collapsible hamburger menu for smaller screens

### Advanced Mobile Menu System
- **Dynamic Positioning**: Menu slides in from either left or right side
- **Position Toggle**: Dedicated button inside the menu to switch opening direction
- **Position Persistence**: Chosen menu position is saved to localStorage
- **Smooth Animations**: CSS transitions for menu opening/closing

### Intelligent Navigation Logic
- **Two-Click System**: 
  - First click on main links expands dropdown with section links
  - Second click navigates to the main page
- **Direct Section Navigation**: Clicking section links navigates directly to specific page sections
- **Smooth Scrolling**: Automatic smooth scrolling to targeted sections

### User Experience Enhancements
- **Click Freeze Protection**: Links are temporarily disabled during navigation to prevent double-clicks
- **Long Press Tooltips**: Hold any interactive element for ~1 second to see descriptive tooltips
- **Visual Feedback**: Active states and hover effects for all interactive elements

### Page Structure
- **Homepage**: Welcome page with platform overview and feature highlights
- **Ideas Page**: Three sections covering research conceptualization, development process, and success metrics
- **ELSI Page**: Three sections addressing ethical frameworks, legal compliance, and social impact
- **Lab Notebook Page**: Three sections for documentation standards, protocols, and data analysis
- **Team Page**: Three sections showcasing team members, research groups, and training programs

### Accessibility Features
- **Semantic HTML**: Proper use of semantic elements and ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Screen Reader Support**: Descriptive alt text and screen reader-only content
- **Color Contrast**: WCAG compliant color schemes in both light and dark modes

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd research-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── ideas/
│   │   └── page.tsx         # Ideas page with 3 sections
│   ├── elsi/
│   │   └── page.tsx         # ELSI page with 3 sections
│   ├── lab-notebook/
│   │   └── page.tsx         # Lab Notebook page with 3 sections
│   ├── team/
│   │   └── page.tsx         # Team page with 3 sections
│   ├── layout.tsx           # Root layout with navbar
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles and theme variables
├── components/
│   ├── navigation/
│   │   ├── Navbar.tsx       # Main navigation component
│   │   ├── ThemeToggle.tsx  # Theme switching component
│   │   └── MobileMenu.tsx   # Mobile menu with position toggle
│   ├── theme-provider.tsx   # Theme context provider
│   └── ui/                  # shadcn/ui components
├── hooks/
│   └── useLongPress.ts      # Custom hook for long press functionality
├── public/                  # Static assets
├── README.md               # This file
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
\`\`\`

## Usage

### Navigation
- **Desktop**: Click main navigation links once to expand section menus, twice to navigate to pages
- **Mobile**: Use the hamburger menu to access navigation, toggle menu position with the arrow button
- **Sections**: Click section links to jump directly to specific parts of pages

### Theme Switching
- Click the sun/moon icon in the top-right corner to toggle between light and dark themes
- Your preference is automatically saved and restored on future visits

### Long Press Tooltips
- Hold down any interactive element (buttons, links) for about 1 second
- A tooltip will appear explaining the element's function
- Release to dismiss the tooltip

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
