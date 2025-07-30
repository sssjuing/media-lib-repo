import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import NiceModal from '@ebay/nice-modal-react';
import zhCN from 'antd/locale/zh_CN';
import { HelmetProvider } from 'react-helmet-async';
import { RouteMeta } from '@repo/antd-layout';
import { routeTree } from './routeTree.gen';
import './index.css';

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  basepath: '/console',
  context: { queryClient },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption extends RouteMeta {
    name: string;
    weight?: number; // 菜单项排序的权重, 越小越靠前
  }
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <NiceModal.Provider>
          <ConfigProvider locale={zhCN} theme={{ cssVar: true, components: { Layout: { headerHeight: 48 } } }}>
            <RouterProvider router={router} />
          </ConfigProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </NiceModal.Provider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);
