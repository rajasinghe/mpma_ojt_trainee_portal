import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import TraineedataPage from './Pages/TraineedataPage';
import AttendancePage from './Pages/AttendancePage';
import { AttendancePageLoader } from './loaders/AttendencePageLoader';

const router = createBrowserRouter([
  {
    path: 'traineedata',
    element: <TraineedataPage />
  },
  {
    path: 'attendance',
    element: <AttendancePage />,
    loader: AttendancePageLoader
  }
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)