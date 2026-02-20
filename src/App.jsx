import React, { useState, useEffect } from 'react';
import { EnrollmentForm } from './components/EnrollmentForm';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { HomePage } from './components/views/HomePage';
import { NetworkStatus } from './components/layout/NetworkStatus';
import { Header } from './components/layout/Header';
import { Chat } from './components/chat/Chat.client';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { toast } from 'sonner@2.0.3';
import { apiService } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [completedEnrollment, setCompletedEnrollment] = useState(null);
  const isOnline = useNetworkStatus();

  // Load data on mount
  useEffect(() => {
    loadEnrollments();
    loadPrograms();
    loadLogo();
    // Fetch users from dummy API
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(console.log);
  }, []);

  const loadEnrollments = async () => {
    try {
      const response = await apiService.getEnrollments();
      if (response.success) {
        setEnrollments(response.data);
      }
    } catch (error) {
      console.error('Failed to load enrollments:', error);
    }
  };

  const loadPrograms = async () => {
    try {
      const response = await apiService.getPrograms();
      if (response.success) {
        setPrograms(response.data);
      }
    } catch (error) {
      console.error('Failed to load programs:', error);
    }
  };

  const loadLogo = async () => {
    try {
      const response = await apiService.getImages('logo');
      if (response.success && response.data.length > 0) {
        setLogoUrl(response.data[0].url);
      } else {
        setLogoUrl('https://images.unsplash.com/photo-1523050854058-8df90110c9f6?w=120&h=120&fit=crop&crop=center');
      }
    } catch (error) {
      console.error('Failed to load logo:', error);
      setLogoUrl('https://images.unsplash.com/photo-1523050854058-8df90110c9f6?w=120&h=120&fit=crop&crop=center');
    }
  };

  const handleEnrollmentComplete = async (data) => {
    const newEnrollment = {
      ...data,
      id: Date.now().toString(),
      enrollmentDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      status: 'pending',
      documentsSubmitted: false,
      documentList: []
    };

    setEnrollments(prev => [...prev, newEnrollment]);
    setCompletedEnrollment(newEnrollment);
    setCurrentView('home');
  };

  const handleAdminLogin = async (username, password) => {
    try {
      const response = await apiService.login(username, password);
      if (response.success) {
        setIsAdminAuthenticated(true);
        setCurrentView('admin-dashboard');
        toast.success('Welcome to the admin dashboard!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('home');
    toast.success('Successfully logged out');
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await apiService.updateEnrollmentStatus(id, status);
      if (response.success) {
        // Reload enrollments from backend to reflect latest data
        await loadEnrollments();
        toast.success(`Enrollment ${status} successfully!`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update enrollment status');
    }
  };

  const startNewEnrollment = () => {
    setCompletedEnrollment(null);
    setCurrentView('enrollment');
  };

  // Fixed goBackToHome function to properly reset state
  const goBackToHome = () => {
    setCompletedEnrollment(null); // Clear the success card
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Home Page
  if (currentView === 'home') {
    return (
      <HomePage
        isOnline={isOnline}
        logoUrl={logoUrl}
        completedEnrollment={completedEnrollment}
        programs={programs}
        enrollments={enrollments}
        onAdminClick={() => setCurrentView('admin-login')}
        onStartEnrollment={startNewEnrollment}
        onGoBackHome={goBackToHome}
      />
    );
  }

  // Enrollment Form View
  if (currentView === 'enrollment') {
    return (
      <div className="min-h-screen bg-gray-50">
        <NetworkStatus isOnline={isOnline} />
        
        <Header
          logoUrl={logoUrl}
          isOnline={isOnline}
          onBackToHome={goBackToHome}
          showBackButton={true}
          title="Far Eastern Polytechnic College"
          subtitle="Student Enrollment Form"
        />
        
        <div className="py-8">
          <EnrollmentForm onComplete={handleEnrollmentComplete} />
        </div>
      </div>
    );
  }

  // Admin Login View
  if (currentView === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  // Admin Dashboard View
  if (currentView === 'admin-dashboard' && isAdminAuthenticated) {
    return (
      <AdminDashboard
        enrollments={enrollments}
        onLogout={handleAdminLogout}
        onUpdateStatus={handleUpdateStatus}
        onRefresh={loadEnrollments}
      />
    );
  }

  // Chat View
  if (currentView === 'chat') {
    return <Chat />;
  }

  return null;
}