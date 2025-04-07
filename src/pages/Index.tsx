
// import { Navigate } from 'react-router-dom';

// const Index = () => {
//   return <Navigate to="/company/dashboard" replace />;
// };

// export default Index;

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold mb-6">Choose a Dashboard</h1>

      <Button
        onClick={() => navigate('/company/dashboard')}
        className="w-60"
      >
        Go to Company Dashboard
      </Button>

      <Button
        onClick={() => navigate('/admin/dashboard')}
        className="w-60"
        variant="secondary"
      >
        Go to Super Admin Dashboard
      </Button>

      <Button
        onClick={() => navigate('/emp/dashboard')}
        className="w-60"
        variant="outline"
      >
        Go to Employee Dashboard
      </Button>
    </div>
  );
};

export default HomePage;

