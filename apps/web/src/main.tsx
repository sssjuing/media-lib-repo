import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import routes from './routes';
import 'normalize.css';

const router = createBrowserRouter(routes as RouteObject[]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ConfigProvider
        theme={{
          cssVar: true,
          components: {
            Layout: { headerHeight: 48 },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
