import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import ForgotPassword from './Pages/forgotpassword';
import ForgotPassword_email from './Pages/forgetpassword_email';
import ForgotPasswordOTP from './Pages/forgetpassword_otp';

function App() {
  return (
    // <div className="App">
    //   <Home/>
    // </div>
    <Router>
      <div className="App">
        
        {/* <Navbar /> */}

        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/forgotpasswordemail' element={<ForgotPassword_email/>}/>
          <Route path='/forgotpasswordotp' element={<ForgotPasswordOTP/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
