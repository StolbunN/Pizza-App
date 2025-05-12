import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Cart } from './pages/Cart/Cart.tsx';
import { Layout } from './layout/Layout/Layout.tsx';
import { ErrorPage } from './pages/Error/ErrorPage.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';

const Menu = lazy(() => import("./pages/Menu/Menu.tsx"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
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
    path: "*",
    element: <ErrorPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
);
