import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'normalize.css';
import routes from './routes';

document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');

const router = createBrowserRouter(routes, {
  basename: '/h5',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
