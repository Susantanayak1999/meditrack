import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

export default function Layout() {
  const { user, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // If the user is not logged in, show only the child routes (the Login page)
  // without the sidebar and topbar.
  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-wider text-blue-400">
            MediTrack
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/dashboard" 
            className="block px-4 py-2 rounded hover:bg-slate-800 transition"
          >
            Dashboard
          </Link>
          <Link 
            to="/patients" 
            className="block px-4 py-2 rounded hover:bg-slate-800 transition"
          >
            Patients
          </Link>
          <Link 
            to="/appointments" 
            className="block px-4 py-2 rounded hover:bg-slate-800 transition"
          >
            Appointments
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <h2 className="text-lg font-semibold text-gray-700">
            Clinic Management
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Logged in as: <strong className="text-slate-900">{user}</strong> ({role})
            </span>
            <button 
              onClick={handleLogout} 
              className="text-sm text-red-500 hover:text-red-700 font-medium transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* PAGE CONTENT (Renders Dashboard, Patients, or Appointments) */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}