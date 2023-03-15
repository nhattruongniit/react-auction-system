import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// layouts
import AdminLayout from "./layouts/AdminLayout";
import RootLayout from "./layouts/RootLayout";

// pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Deposit = React.lazy(() => import("./pages/Deposit"));
const CreateItem = React.lazy(() => import("./pages/CreateItem"));
const DepositProduct = React.lazy(
  () => import("./pages/Deposit/DepositProduct")
);
const DepositTodo = React.lazy(() => import("./pages/Deposit/DepositTodo"));

// guards
import GuestGuard from "./guards/GuestGuard";
import AuthGuard from "./guards/AuthGuard";

// configs
import { PATH_NAME } from "./config";

const routesConfig = [
  {
    path: PATH_NAME.ROOT,
    component: Dashboard,
    layout: AdminLayout,
    guard: AuthGuard,
  },
  {
    path: PATH_NAME.LOGIN,
    component: Login,
    guard: GuestGuard,
  },
  {
    path: PATH_NAME.REGISTER,
    component: Register,
    guard: GuestGuard,
  },
  {
    path: PATH_NAME.DEPOSIT,
    component: Deposit,
    layout: AdminLayout,
    guard: AuthGuard,
    children: [
      {
        path: "/deposit/product",
        component: DepositProduct,
      },
      {
        path: "/deposit/todo",
        component: DepositTodo,
      },
    ],
  },
  {
    path: PATH_NAME.CREATE_ITEM,
    component: CreateItem,
    layout: AdminLayout,
    guard: AuthGuard,
  },
];

function RoutesMain() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        {routesConfig.map((route, routeIndex) => {
          const Layout = route.layout || React.Fragment;
          const Component = route.component || React.Fragment;
          const Guard = route.guard || React.Fragment;
          return (
            <Route
              key={`routes-${routeIndex}`}
              path={route.path}
              element={
                <Guard>
                  <Layout>
                    <Component />
                  </Layout>
                </Guard>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default RoutesMain;
