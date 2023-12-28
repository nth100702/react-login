
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import {Routes, Route, Link} from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import Forgot from './components/Forgot';

function App() {

const {user}=useContext(UserContext);

console.log("User: ", user)

  return (
    <div className='app-container'>
      
      <Container>
      <Header/>
      <TableUsers/>
        <Routes>
          <Route path="/" element={<TableUsers/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot" element={<Forgot />}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
