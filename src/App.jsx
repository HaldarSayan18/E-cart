import { Route, Routes } from 'react-router-dom';
import './App.css';
import Ecart from './Components/Ecart details/Ecart';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Ecart/>}/>
    </Routes>
    </>
  );
}

export default App;
