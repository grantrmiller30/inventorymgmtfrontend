import { Routes, Route } from 'react-router-dom'

import Login from './features/auth/Login'
import Layout from './components/Layout'
import NewItem from './features/items/NewItem'
import NewUser from './features/users/NewUser'
import ItemsList from './features/items/ItemsList'
import DetailedItem from './features/items/DetailedItem'
import EditItem from './features/items/EditItem'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>   
        <Route index element={<ItemsList/>}/>
        <Route path="users">
          <Route path="new" element={<NewUser/>}/>
        </Route>
        <Route path="items">
          <Route path=":id" element={<DetailedItem/>}/>
          <Route path="edit/:id" element={<EditItem/>}/>
        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="new" element={<NewItem/>}/> 
        <Route path="inv" element={<ItemsList/>}/>
      </Route>
    </Routes>
  );
}

export default App;
