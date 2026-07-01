import { ToastContainer } from 'react-toastify';
import { AppLayout } from '@/components/layout/AppLayout';
import RoutesManagements from './RoutesManagements';

export function App() {
  return (
    <AppLayout>
      <RoutesManagements />

      <ToastContainer
        position="top-right"
        autoClose={3500}
        newestOnTop
        rtl
        closeOnClick
        pauseOnHover
      />
    </AppLayout>
  );
}
