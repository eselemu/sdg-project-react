import './App.css';
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ForumMain from './components/forum/ForumMain';
import NewsletterMain from './components/newsletter/NewsletterMain';
import IndexMain from './components/index/IndexMain';
import VideoGameMain from './components/videogame/VideoGameMain';
import LoginSignUpMain from './components/loginSignup/LoginSignupMain';

import './components/NavBar.css';

function App() {
  const news = require('./news.json');
  return (
    <div className="App">
      
      <NavBar />

      <Routes>
        <Route path = "/" element = {<IndexMain />} />
        <Route path = "/login" element = {<LoginSignUpMain />} />
        <Route path = "/newsletter" element = {<NewsletterMain news={news} />} />
        <Route path = "/forum" element = {<ForumMain />} />
        <Route path = "/videogame" element = {<VideoGameMain />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;