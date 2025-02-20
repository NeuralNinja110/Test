# Neptune - Marine Mapping Platform

Neptune is a modern web application that combines secure authentication with powerful mapping capabilities, providing users with access to both standard OpenStreetMap data and specialized marine data from INCOIS (Indian National Centre for Ocean Information Services).

## Features

### Authentication
- Secure email/password registration and login
- Google OAuth integration for quick access
- Protected routes and user session management

### Mapping Capabilities
- Interactive OpenStreetMap integration centered on Chennai
- Special marine data visualization through INCOIS Geoportal
- Responsive design with fullscreen map views
- Loading states and error handling for map components

## Tech Stack

- React.js with Vite for fast development and building
- React Router for navigation
- Material-UI (MUI) for modern UI components
- Firebase Authentication for user management
- Leaflet.js for interactive maps
- INCOIS Geoportal integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account and project

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd neptune
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
   - Create a new project in Firebase Console
   - Enable Authentication (Email/Password and Google Sign-in)
   - Create a web app in your Firebase project
   - Copy the Firebase configuration
   - Create `src/firebase.js` with your config:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration object
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

4. Start the development server
```bash
npm run dev
```

## Usage

### Authentication
- Navigate to `/signup` to create a new account
- Use `/login` to access an existing account
- Sign in with Google option available on both pages

### Dashboard
- Main map view centered on Chennai
- User profile accessible from the top-right corner
- Access to special marine map through profile menu

### Special Map
- INCOIS Geoportal integration for specialized marine data
- Fullscreen view with back navigation
- Fallback option to open in new tab if loading fails

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
