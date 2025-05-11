import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import TraineedataPage from './pages/TraineedataPage';
import { TraineedataLoader } from './loaders/TraineedataLoader';
import { ScrollToTop } from "./components/common/ScrollToTop.tsx";

import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import Home from "./pages/Dashboard/Home";
import AppLayout from "./layout/AppLayout.tsx";
import ViewAttendancePage from "./pages/ViewAttendancePage.tsx";
import { AttendanceLoader } from "./loaders/AttendanceLoader.ts";
import UserProfiles from "./pages/UserProfiles.tsx";
import NotFound from "./pages/OtherPage/NotFound.tsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/traineedata',
        element: <TraineedataPage />,
        loader: TraineedataLoader
      },
      {
        path: '/attendance',
        element: <ViewAttendancePage />,
        loader: AttendanceLoader
      },
      {
        path: '/calendar',
        element: <Calendar />
      },
      {
        path: '/blank',
        element: <Blank />
      },
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <UserProfiles />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <RouterProvider router={router} />
      </AppWrapper>
    </ThemeProvider>
  </React.StrictMode>
);