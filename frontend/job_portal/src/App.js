import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
