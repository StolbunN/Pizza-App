import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Cart } from './pages/Cart/Cart.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { ErrorPage } from './pages/Error/ErrorPage.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Success } from './pages/Success/Success.tsx';

const Menu = lazy(() => import("./pages/Menu/Menu.tsx"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Layout/></RequireAuth>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Menu/>
          </Suspense>
        )
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "/product/:id",
        element: <Product/>,
        loader: async ({params}) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e))
              }, 1000)
            })
          })
        },
        errorElement: <>Ошибка</>
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      }
    ] 
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
