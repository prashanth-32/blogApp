import './App.css'
import Content from './components/Content'
import Layout from './components/Layout'
import {Routes,Route} from "react-router-dom"
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Create from './components/Create'
import { UserContextProvider } from './components/UserContext'
import PostPage from './components/PostPage'
import EditPost from './components/EditPost'

function App() {

  return (
    <>
    <UserContextProvider>
    <Routes>
      <Route path='/' element = {<Layout/>}>
        <Route index element={<Content/>}></Route>
        <Route path='login' element={<Login/> }></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='create' element={<Create/>}></Route>
        <Route path='/post/:id' element={<PostPage/>}></Route>
        <Route path='/edit/:id' element={<EditPost/>}></Route>
      </Route>
     </Routes>
     </UserContextProvider>
    </>
  )
}

export default App
