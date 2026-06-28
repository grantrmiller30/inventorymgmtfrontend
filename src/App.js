import { Routes, Route } from 'react-router-dom'

import Login from './features/auth/Login'
import ItemsList from './features/items/ItemsList'
import Layout from './components/Layout';
import NewItem from './features/items/NewItem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ItemsList/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="new" element={<NewItem/>}/> 
      </Route>
    </Routes>
  );
}

export default App;
