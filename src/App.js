import { Routes, Route } from 'react-router-dom'

import Login from './features/auth/Login'
import ItemsList from './features/items/ItemsList'
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ItemsList/>}/>
        <Route path="login" element={<Login/>}/> 
      </Route>
    </Routes>
  );
}

export default App;
