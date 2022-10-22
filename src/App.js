import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomNavbar from './Components/Navbar';
import AddQuiz from './pages/AddQuiz';
function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
