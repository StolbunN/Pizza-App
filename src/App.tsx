import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {

  return (
    <>
      <Button>Стандартная кнопка</Button>
      <Button appearance='big'>Большая кнопка</Button>
      <Input type="email" placeholder='Email'/>
    </>
  );
}

export default App;
