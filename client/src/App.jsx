import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'

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
      {/*Depending on the route is the component that is going to be rendered, if the user is not logged it cant access the forum component*/}
      <NavBar />

      <Routes>
        <Route path = "/" element = {<IndexMain />} />
        <Route path = "/login" element = {<LoginSignUpMain />} />
        <Route path = "/newsletter" element = {<NewsletterMain news={news} />} />
        <Route path = "/forum" element = {localStorage.getItem('usernameSaludDigna') ? <ForumMain /> : <Navigate to = "/login" />} />
        <Route path = "/videogame" element = {<VideoGameMain />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;