import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'

import Temporal from './components/Temporal';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ForumMain from './components/forum/ForumMain';

import './components/NavBar.css';

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path = "/" element = {<Temporal />} />
        <Route path = "/signup" element = {<Temporal />} />
        <Route path = "/login" element = {<Temporal />} />
        <Route path = "/newsletter" element = {<Temporal />} />
        <Route path = "/forum" element = {<ForumMain />} />
        <Route path = "/videogame" element = {<Temporal />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;