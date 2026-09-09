import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';

// Trainee Pages (Structured under /pages/trainee/)
import TraineeDashboard from './pages/trainee/TraineeDashboard';
import TraineeCourses from './pages/trainee/TraineeCourses';
import TraineeSessions from './pages/trainee/TraineeSessions';
import TraineeProgress from './pages/trainee/TraineeProgress';
import TraineeCertificates from './pages/trainee/TraineeCertificates';

// Trainer Pages (Structured under /pages/trainer/)
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerBatches from './pages/trainer/TrainerBatches';
import TrainerCourses from './pages/trainer/TrainerCourses';
import TrainerAttendance from './pages/trainer/TrainerAttendance';
import TrainerAnalytics from './pages/trainer/TrainerAnalytics';

// Admin Pages (Structured under /pages/admin/)
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCapacity from './pages/admin/AdminCapacity';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminReports from './pages/admin/AdminReports';



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

            {/* Profile Route */}
            <Route path="profile" element={<UserProfile />} />

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

          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
