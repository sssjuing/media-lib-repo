import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import routes from './routes';
import 'normalize.css';

document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');

const router = createBrowserRouter(routes, {
  basename: '/h5',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
