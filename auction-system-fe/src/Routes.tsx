import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// layouts
import AdminLayout from './layouts/AdminLayout';

// pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Deposit = React.lazy(() => import('./pages/Deposit'));
const CreateItem = React.lazy(() => import('./pages/CreateItem'));

// configs
import { PATH_NAME } from './config';

const routesConfig = [
  {
    path: PATH_NAME.ROOT,
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: PATH_NAME.LOGIN,
    component: Login,
  },
  {
    path: PATH_NAME.REGISTER,
    component: Register,
  },
  {
    path: PATH_NAME.DEPOSIT,
    component: Deposit,
    layout: AdminLayout,
  },
  {
    path: PATH_NAME.CREATE_ITEM,
    component: CreateItem,
    layout: AdminLayout,
  }
]

function RoutesMain() {
  return (
    <Suspense fallback={<div />}>
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