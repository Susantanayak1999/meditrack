import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from './app/store';
import { login } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogin = (role: 'Admin' | 'Doctor' | 'Receptionist') => {
    dispatch(login({ username: `Dr. Smith`, role }));
    navigate('/dashboard'); // Redirect to dashboard on login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">MediTrack</h1>
        <p className="text-slate-500 text-center mb-8">Enterprise Clinic Management</p>
        
        {!user ? (
          <div className="space-y-4">
            <button 
              onClick={() => handleLogin('Admin')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login as Admin
            </button>
            <button 
              onClick={() => handleLogin('Doctor')}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Login as Doctor
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">Already logged in</p>
            <button onClick={() => navigate('/dashboard')} className="text-blue-600 underline">Go to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;