import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import RoomPage from "./Pages/RoomPage";
import AllHomes from "./Pages/allHomes";
import ErrorPage from "./Pages/ErrorPage";


function App() {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/homes' element={<AllHomes />}/>
        <Route path='/room/:id' element={<RoomPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>

        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>

        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
