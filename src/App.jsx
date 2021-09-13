import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Genres from './pages/Genres';
import MovieDetails from './pages/MovieDetails';
import MoviesByGenre from './pages/MoviesByGenre';
import NowPlaying from './pages/NowPlaying';
import PersonDetails from './pages/PersonDetails';
import Popular from './pages/Popular';
import Search from './pages/Search';
import TopRated from './pages/TopRated';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route path="/now-playing" component={NowPlaying} />
        <Route path="/top-rated" component={TopRated} />
        <Route path="/genres/:genreId" component={MoviesByGenre} />
        <Route path="/genres" component={Genres} />
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/people/:id" component={PersonDetails} />
        <Route path="/search" component={Search} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
