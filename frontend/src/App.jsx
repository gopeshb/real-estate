import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import ShowListing from "./pages/ShowListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import { Toaster } from 'react-hot-toast';
import Search from "./pages/Search";
export default function App() {
  return (
    <BrowserRouter>
    <Toaster/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/listing/:listingId" element={<Listing/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/search" element={<Search/>}></Route>
      <Route element={<PrivateRoute/>} >
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/create-listing" element={<CreateListing/>}/>
      <Route path="/show-listing" element={<ShowListing/>}/>
      <Route path="/update-listing/:listingId" element={<UpdateListing/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
