import { Routes, Route } from 'react-router-dom'

import Login from './features/auth/Login'
import Layout from './components/Layout'
import NewItem from './features/items/NewItem'
import NewUser from './features/users/NewUser'
import ItemsList from './features/items/ItemsList'
import DetailedItem from './features/items/DetailedItem'
import EditItem from './features/items/EditItem'
import RequireAuth from './features/auth/RequireAuth'
import PersistLogin from './features/auth/PersistLogin'
import Prefetch from './features/auth/Prefetch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>   
      <Route element={<Prefetch/>}> 
        {/* Public Routes */}
        <Route index element={<ItemsList/>}/>
        <Route path="inv" element={<ItemsList/>}/>
        <Route path="users">
          <Route path="new" element={<NewUser/>}/>
        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="items/:id" element={<DetailedItem/>}/>
        {/* Protected routes */}
        <Route path="items" element={<RequireAuth/>}>
          <Route path="new" element={<NewItem/>}/> 
          <Route path="edit/:id" element={<EditItem/>}/>
        </Route>
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
