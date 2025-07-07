import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { HocExample } from './examples/hoc-example.tsx'
import { RenderExample } from './examples/render-example.tsx';
import { SlotExample } from './examples/slot-example.tsx';
import { PortalExample } from './examples/portal-example.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/hoc",
    element: <HocExample />,
  },
  {
    path: "/render",
    element: <RenderExample />,
  },
  {
    path: "/slot",
    element: <SlotExample />,
  },
  {
    path: "/portal",
    element: <PortalExample />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
