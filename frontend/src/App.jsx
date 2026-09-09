import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';

// Trainee Pages
import TraineeDashboard from './pages/TraineeDashboard';
import TraineeCourses from './pages/trainee/TraineeCourses';
import TraineeSessions from './pages/trainee/TraineeSessions';
import TraineeProgress from './pages/trainee/TraineeProgress';
import TraineeCertificates from './pages/trainee/TraineeCertificates';

// Trainer Pages
import TrainerDashboard from './pages/TrainerDashboard';
import TrainerBatches from './pages/trainer/TrainerBatches';
import TrainerCourses from './pages/trainer/TrainerCourses';
import TrainerAttendance from './pages/trainer/TrainerAttendance';
import TrainerAnalytics from './pages/trainer/TrainerAnalytics';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCapacity from './pages/admin/AdminCapacity';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminReports from './pages/admin/AdminReports';

// Presentation Deck
import PresentationDeck from './pages/PresentationDeck';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/${user.role}`} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Layout Shell */}
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<HomeRedirect />} />

            {/* Trainee Routes */}
            <Route path="trainee" element={<TraineeDashboard />} />
            <Route path="trainee/courses" element={<TraineeCourses />} />
            <Route path="trainee/sessions" element={<TraineeSessions />} />
            <Route path="trainee/progress" element={<TraineeProgress />} />
            <Route path="trainee/certificates" element={<TraineeCertificates />} />

            {/* Trainer Routes */}
            <Route path="trainer" element={<TrainerDashboard />} />
            <Route path="trainer/batches" element={<TrainerBatches />} />
            <Route path="trainer/courses" element={<TrainerCourses />} />
            <Route path="trainer/attendance" element={<TrainerAttendance />} />
            <Route path="trainer/analytics" element={<TrainerAnalytics />} />

            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/capacity" element={<AdminCapacity />} />
            <Route path="admin/departments" element={<AdminDepartments />} />
            <Route path="admin/reports" element={<AdminReports />} />

            {/* Presentation Deck */}
            <Route path="presentation" element={<PresentationDeck />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
