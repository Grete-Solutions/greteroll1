
// import { Navigate } from 'react-router-dom';

// const Index = () => {
//   return <Navigate to="/company/dashboard" replace />;
// };

// export default Index;

// src/pages/HomePage.tsx
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold mb-6">Choose a Dashboard</h1>

      <a href="/company/dashboard" target="_blank" rel="noopener noreferrer">
        <Button className="w-60">Go to Company Dashboard</Button>
      </a>

      <a href="/admin/dashboard" target="_blank" rel="noopener noreferrer">
        <Button className="w-60" variant="secondary">Go to Admin Dashboard</Button>
      </a>

      <a href="/emp/dashboard" target="_blank" rel="noopener noreferrer">
        <Button className="w-60" variant="outline">Go to Employee Dashboard</Button>
      </a>
    </div>
  );
};

export default HomePage;
