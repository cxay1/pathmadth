import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Upload from './pages/Upload';
import VideoPlayer from './components/VideoPlayer';
import ScrollToTop from './components/ScrollToTop'
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import AnimatedLogo from './components/AnimatedLogo';
import Jobseekers from "./pages/JobSeekers"
import Employers from './pages/Employers'
import ContactUs from './pages/ContactUs'
import Auth from './pages/Auth';
import NameStep from './pages/onboarding/NameStep';
import BirthdayStep from './pages/onboarding/BirthdayStep';
import StateStep from './pages/onboarding/StateStep';
import AddJob from './pages/AddJob';


function App() {
  const location = useLocation();
  return (
    <>
      <AuthProvider>
        {location.pathname !== '/auth' && <AnimatedLogo />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-seekers" element={<Jobseekers />} />
          <Route path="/employer" element={<Employers />} /> 
          <Route path="/upload" element={ <Upload />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/onboarding/name" element={
            <ProtectedRoute>
              <NameStep />
            </ProtectedRoute>
          } />
          <Route path="/onboarding/dob" element={
            <ProtectedRoute>
              <BirthdayStep />
            </ProtectedRoute>
          } />
          <Route path="/onboarding/state" element={
            <ProtectedRoute>
              <StateStep />
            </ProtectedRoute>
          } />

          <Route path="/jobs/new" element={
            <ProtectedRoute requiredRole="employer">
              <AddJob />
            </ProtectedRoute>
          } />
          
          <Route path="/video/:id" element={
            <ProtectedRoute>
              <VideoPlayer />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          {/* Fallback Routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
