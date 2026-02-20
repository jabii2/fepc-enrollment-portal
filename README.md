
# Far Eastern Polytechnic College Enrollment Portal

This is a modern, responsive enrollment portal for Far Eastern Polytechnic College built with React, Vite, and Tailwind CSS. The original design is available at [Figma](https://www.figma.com/design/6I09QKYGg5zAu4INz0sqrB/Far-Eastern-Polytechnic-College-Enrollment-Portal).

## Features

### 🎓 Student Enrollment
- **Multi-step Enrollment Form**: Comprehensive form with validation for student registration
- **Program Selection**: Choose from Senior High School (SHS) and College programs
- **Real-time Validation**: Form validation with error handling
- **Success Confirmation**: Enrollment completion with success card

### 👨‍💼 Admin Dashboard
- **Enrollment Management**: View and manage all student enrollments
- **Status Updates**: Approve, reject, or update enrollment status
- **Search & Filter**: Find enrollments by various criteria
- **Statistics Overview**: Enrollment statistics and insights

### 💬 Chat Assistant
- **AI-Powered Chat**: Interactive chat interface for student support
- **Chat History**: Save and manage multiple conversations
- **Settings Panel**: Customize chat parameters (temperature, model, etc.)
- **Persistent Storage**: Chat history saved locally

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Theme**: Theme switching capability
- **Accessible Components**: Built with Radix UI primitives
- **Smooth Animations**: Enhanced user experience with transitions

### 🔧 Technical Features
- **Offline Support**: Network status monitoring
- **API Integration**: Backend integration for data management
- **State Management**: Zustand for chat state, React hooks for app state
- **Form Handling**: React Hook Form with validation
- **Icons**: Lucide React icons throughout

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: Zustand, React Hooks
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Charts**: Recharts (available for future analytics)
- **Backend**: PHP API with MySQL database

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PHP 7.4+ (for backend)
- MySQL (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd far-eastern-polytechnic-college-enrollment-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3001`

### Backend Setup

1. **Install PHP**
   - Download and install PHP from https://windows.php.net/download
   - Add PHP to your system PATH

2. **Configure database**
   - Import the database schema from `src/backend/setup/database_setup.sql` into phpMyAdmin
   - Make sure MySQL is running and database `fepc_enrollment` is created
   - Default admin credentials: username: `admin`, password: `admin123`

3. **Start PHP server**
   - Double-click `start-backend.bat` or run it from command prompt
   - Backend will start on `http://localhost:8080`

### Important Notes
- Frontend runs on **port 3001**, backend on **port 8080**
- Make sure both servers are running for full functionality
- CORS is configured to allow requests from **localhost:3001**
- If enrollment status updates don't reflect in phpMyAdmin, check that the backend server is running
- All port configurations are standardized and consistent across the project

## Project Structure

```
src/
├── components/
│   ├── chat/           # Chat assistant components
│   ├── ui/            # Reusable UI components
│   ├── views/         # Page components
│   ├── layout/        # Layout components
│   └── home/          # Home page sections
├── backend/           # PHP backend files
├── hooks/            # Custom React hooks
├── services/         # API service functions
└── styles/           # Global styles and CSS
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Far Eastern Polytechnic College.
  