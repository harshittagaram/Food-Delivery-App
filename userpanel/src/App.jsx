import React from 'react'
import Menubar from './components/Menubar/Menubar'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import ExploreFood from './pages/ExploreFood/ExploreFood'
import FoodDetails from './pages/FoodDetails/FoodDetails'
import {Route,Routes} from "react-router-dom";
import Cart from './pages/Cart/Cart'

const App = () => {
  return (
    <div>
      <Menubar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/explore' element={<ExploreFood/>}/>
        <Route path='/food/:id' element={<FoodDetails/>}/>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </div>
  )
}

export default App
