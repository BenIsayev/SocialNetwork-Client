import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider } from './context/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost'
import NavBar from './components/NavBar'


function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Container>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/posts/:postId' element={<SinglePost />} />
          </Routes>
        </Container>
      </Router >
    </AuthProvider>
  );
}

export default App;
