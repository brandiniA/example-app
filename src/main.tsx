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
import { OptimizationExample } from './examples/optimization-example.tsx';
import ReactFundamentalsExample from './examples/react-fundamentals-example';
import { ReactElementsChildrenPropsExample } from './examples/react-elements-children-props-example/react-elements-children-props-example.tsx';
import { ElementosComoProps } from './examples/elementos-como-props/elementos-como-props.tsx';
import { RenderPropsAvanzado } from './examples/render-props-avanzado/render-props-avanzado.tsx';
import { ReactElementsChildrenPropsFlow } from './examples/react-elements-children-props-flow/react-elements-children-props-flow.tsx';

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
  {
    path: "/optimization/*",
    element: <OptimizationExample />,
  },
  {
    path: "/react-fundamentals",
    element: <ReactFundamentalsExample />,
  },
  {
    path: "/react-elements-children-props",
    element: <ReactElementsChildrenPropsExample />,
  },
  {
    path: "/elements-as-props",
    element: <ElementosComoProps />,
  },
  {
    path: "/advanced-render-props",
    element: <RenderPropsAvanzado />,
  },
  {
    path: "/react-elements-children-props-flow",
    element: <ReactElementsChildrenPropsFlow />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
