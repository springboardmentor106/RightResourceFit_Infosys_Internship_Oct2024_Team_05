import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import ForgotPassword_email from './Pages/forgotPassword_email';
import ForgotPasswordOtp from './Pages/forgotPassword_otp';
import CreatePasswordNew from './Pages/createPassword_new';


function App() {
  return (
    // <div className="App">
    //   <Home/>
    // </div>
    <Router>
      <div className="App">
        
        <Navbar />

        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path='/forgotPassword_email' element={<ForgotPassword_email/>}/>
          <Route path='/forgotPassword_otp' element={<ForgotPasswordOtp/>}/>
          <Route path='/createPassword_new' element={<CreatePasswordNew/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
