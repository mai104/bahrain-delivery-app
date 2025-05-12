# Bahrain Delivery App

A modern web application for water and gas delivery services in Bahrain. The application features both standard 2D and immersive 3D UI modes, with full support for Arabic (RTL) and English languages.

## Features

- **Dual UI Modes**: Switch between standard 2D interface and enhanced 3D interface
- **Multilingual Support**: Full support for Arabic (RTL) and English (LTR)
- **Dark/Light Theme**: Adapts to user preferences with persistent selection
- **Responsive Design**: Works across all device sizes
- **Interactive 3D Elements**: Water-themed animations and visual effects
- **Product Catalog**: Browse water and gas products with detailed information
- **Shopping Cart**: Add products to cart with size and quantity selection

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with PostCSS
- **Routing**: React Router DOM
- **3D Graphics**: Three.js with React Three Fiber and Drei
- **Animations**: 
  - Framer Motion for UI animations
  - GSAP for complex sequential animations

## Project Structure

```
src/
├── assets/           # Static assets like images, icons, etc.
├── components/
│   ├── common/       # Shared components used across multiple pages
│   │   ├── buttons/  # Button components
│   │   ├── cards/    # Card components
│   │   ├── inputs/   # Input components
│   │   ├── layout/   # Layout components like Header, Footer
│   │   └── ui/       # Other UI components
│   ├── features/     # Feature-specific components
│   │   ├── auth/     # Authentication-related components
│   │   ├── cart/     # Shopping cart components
│   │   ├── product/  # Product-related components
│   │   └── services/ # Service-related components
│   └── 3d/           # 3D-specific components
│       ├── effects/  # Visual effects for 3D mode
│       ├── models/   # 3D models
│       └── sections/ # 3D section components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
│   ├── auth/         # Authentication pages
│   ├── home/         # Home page variants
│   ├── products/     # Product pages
│   └── services/     # Service pages
├── services/         # API services and data fetching
├── styles/           # Global styles and theme definitions
└── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/bahrain-delivery-app.git
   cd bahrain-delivery-app
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Build for production
   ```
   npm run build
   # or
   yarn build
   ```

## Development Workflow

### Code Style

- Use consistent naming conventions
- Follow React best practices
- Comment complex logic
- Use modular components

### Component Structure

- Components should be small and focused
- Use composition for complex UIs
- Keep state as local as possible
- Use custom hooks for reusable logic

### Performance Considerations

- Lazy load routes for better initial load time
- Use React.memo for expensive components
- Optimize images and assets
- Implement proper loading states

## Future Enhancements

- Implement TypeScript for better type safety
- Add unit and integration tests
- Implement a state management solution (Zustand or Redux Toolkit)
- Build a proper backend API
- Add user authentication and profile management
- Implement checkout and payment processing
- Add order tracking functionality
- Enhance 3D models and animations

## License

This project is licensed under the MIT License - see the LICENSE file for details.
