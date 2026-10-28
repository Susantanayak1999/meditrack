import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { addPatient } from '../features/patients/patientSlice';
import Modal from '../components/Modal';
import { graphqlClient } from '../lib/graphqlClient';
import { GET_MOCK_PATIENTS } from '../lib/queries';

export default function Patients() {
  const dispatch = useDispatch();
  // We still get locally added patients from Redux
  const localPatients = useSelector((state: RootState) => state.patients.list);
  
  const [apiPatients, setApiPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from GraphQL on mount
  useEffect(() => {
    graphqlClient.request(GET_MOCK_PATIENTS)
      .then((data: any) => {
        // Map the GraphQL response to our Patient shape
        const mapped = data.posts.data.map((post: any, index: number) => ({
          id: `API-${post.id}`,
          name: post.title.substring(0, 20) + '...', // Using title as name
          age: 20 + index,
          gender: index % 2 === 0 ? 'Male' : 'Female',
          doctor: 'Dr. Smith',
          status: 'Admitted'
        }));
        setApiPatients(mapped);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("GraphQL Error:", err);
        setIsLoading(false);
      });
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    doctor: 'Dr. Smith',
    status: 'Admitted' as 'Admitted' | 'Discharged' | 'Critical'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPatient({
      id: `P-${Math.floor(Math.random() * 9000) + 1000}`,
      name: formData.name,
      age: Number(formData.age),
      gender: formData.gender,
      status: formData.status,
      doctor: formData.doctor,
    }));
    setIsModalOpen(false);
    setFormData({ name: '', age: '', gender: 'Male', doctor: 'Dr. Smith', status: 'Admitted' });
  };

  // Combine API patients and Local Redux patients
  const allPatients = [...localPatients, ...apiPatients];

  const filteredPatients = allPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Admitted': return 'bg-blue-100 text-blue-700';
      case 'Discharged': return 'bg-green-100 text-green-700';
      case 'Critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 relative">
      
      {/* HEADER SECTION */}
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all registered patients {isLoading && <span className="text-blue-500 animate-pulse">(Fetching from GraphQL...)</span>}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition whitespace-nowrap"
          >
            + Add Patient
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-medium">Patient ID</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Age/Gender</th>
              <th className="px-6 py-4 font-medium">Doctor</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{patient.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{patient.age} / {patient.gender}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{patient.doctor}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredPatients.length === 0 && !isLoading && (
          <div className="p-8 text-center text-gray-500">
            No patients found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* ADD PATIENT MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Patient">
        {/* ... (Keep the same form code from the previous step here) ... */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input required type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Doctor</label>
            <select value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Dr. Smith</option>
              <option>Dr. Adams</option>
              <option>Dr. Lee</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Status</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Admitted">Admitted</option>
              <option value="Critical">Critical</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Save Patient</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}