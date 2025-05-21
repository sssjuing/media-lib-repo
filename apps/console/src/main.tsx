import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import router from '@/router';
import './index.css';

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
