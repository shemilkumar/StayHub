import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import RoomPage from "./Pages/RoomPage";
import AllHomes from "./Pages/allHomes";
import ErrorPage from "./Pages/ErrorPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import MyBookingsPage from "./Pages/MyBookingsPage";
import SearchResultPage from "./Pages/SearchResultPage";


function App() {
  return (
    <Router >
      <Provider store={store}>
        <Routes>

          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>

          <Route path='/' element={<Home/>}/>
          <Route path='/homes' element={<AllHomes />}/> 
          <Route path='/home/:id' element={<RoomPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/myBookings' element={<MyBookingsPage/>}/>
          <Route path='/searchResult' element={<SearchResultPage/>}/>

          <Route path='/forgotPassword' element={<ForgotPasswordPage/>}/>
          <Route path='/resetPassword/:resetToken' element={<ResetPasswordPage/>}/>

          <Route path='/error/:message' element={<ErrorPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>

        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
