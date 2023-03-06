import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// layouts
import AdminLayout from './layouts/AdminLayout';

// pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const routesConfig = [
  {
    path: '/',
    component: Dashboard,
    layout: AdminLayout,
  }
]

function RoutesMain() {
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <Routes>
        {routesConfig.map((route, routeIndex) => {
          const Layout = route.layout || React.Fragment;
          const Component = route.component || React.Fragment;
          return (
            <Route 
              key={`routes-${routeIndex}`}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              } 
            />
          )
        })}
      </Routes>
    </Suspense>
  )
}

export default RoutesMain