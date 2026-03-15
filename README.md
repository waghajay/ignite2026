# IGNITE Website

A Next.js website for the IGNITE organization with React components integration.

## Features

- Next.js 14 with TypeScript
- React components for events, gallery, and registration
- Responsive design with Tailwind CSS and custom styling
- Event management system with registration
- Gallery with auto-carousel functionality
- About page with organization information

## Color Scheme

- Gold Gradient: `#F5C870` to `#B07A15`
- Dark Background: `#161b22`
- Accent Gold: `#D4A574`

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Add your images to the `public/images/` folder:
   - `IMG_0773.png` - Team/event photos
   - `ig_logo.png` - IGNITE logo
   - `Frame 55.png` - Additional images

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── about/
│   ├── event-details/
│   ├── contact/
│   └── team/
├── components/          # Shared React components
├── src/                 # Legacy React components (to be migrated)
├── public/
│   └── images/
└── package.json
```

## Development

The app runs on http://localhost:3000/ by default with Next.js.
