import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/app.css';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from "./pages/Payer";
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import UserListedContents from './pages/UserListedContents';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signin" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tvshows" element={<TvShows />} />
        <Route exact path="/mylist" element={<UserListedContents />} />
        <Route exact path="/" element={<Netflix />} />
        <Route exact path="*" element={<>404 No page found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
