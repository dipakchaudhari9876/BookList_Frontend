import './App.css';
import Auth from './component/Auth/Auth';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Create from './component/Create/Create';
import Home from './component/Home/Home';
import Show from './component/Show/Show';
import StrictRoute from './component/Strict/strict';

function App() {
  
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/create/:id' element={<StrictRoute Child={Create}/>}/>
        <Route path='/home' element={<StrictRoute Child={Home}/>}/>
        <Route path='/show/:id' element={<StrictRoute Child={Show}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
