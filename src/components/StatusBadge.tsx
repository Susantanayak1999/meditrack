interface StatusBadgeProps {
  status: 'Admitted' | 'Discharged' | 'Critical';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'Admitted': return 'bg-blue-100 text-blue-700';
      case 'Discharged': return 'bg-green-100 text-green-700';
      case 'Critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle()}`}>
      {status}
    </span>
  );
}