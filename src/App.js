import { Routes, Route } from 'react-router-dom'

import Login from './features/auth/Login'
import ItemsList from './features/items/ItemsList'
import Layout from './components/Layout'
import NewItem from './features/items/NewItem'
import NewUser from './features/users/NewUser'
import SortedItemsList from './features/items/SortedItemsList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>   
        <Route index element={<ItemsList/>}/>
        <Route path="users">
          <Route path="new" element={<NewUser/>}/>
        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="new" element={<NewItem/>}/> 
        <Route path="inv" element={<SortedItemsList/>}/>
      </Route>
    </Routes>
  );
}

export default App;
