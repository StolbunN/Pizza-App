import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu/>
  },
  {
    path: "/cart",
    element: <Cart/>
  },
  {
    path: "/",
    element: <Error/>
  }
])

function App() {

  return (
    <>
      <Button>Стандартная кнопка</Button>
      <Button appearance='big'>Большая кнопка</Button>
      <Input type="email" placeholder='Email'/>
      <div>
        <a href="/">Menu</a><br />
        <a href="/cart">Cart</a>
      </div>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
