import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import './index.css'
import store from './store.js'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import Homescreen from './screen/Homescreen.jsx'
import LoginScreen from './screen/LoginScreen.jsx'
import RegisterScreen from './screen/RegisterScreen.jsx'
import Profile from './screen/Profile.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>

    <Route index={true} path='/'  element={<Homescreen/>}/>
    <Route path="/login" element={<LoginScreen/>}/>
    <Route path="/register" element={<RegisterScreen/>}/>
    <Route path='' element={<PrivateRoute />}>
    <Route path='/profile' element={<Profile/>}/>
    </Route>


    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
  <StrictMode>

   <RouterProvider router={router}/>
  </StrictMode>,
    </Provider>
)
