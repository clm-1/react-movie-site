import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Genres from './pages/Genres';
import MovieDetails from './pages/MovieDetails';
import MoviesByGenre from './pages/MoviesByGenre';
import NowPlaying from './pages/NowPlaying';
import PersonDetails from './pages/PersonDetails';
import Popular from './pages/Popular';
import TopRated from './pages/TopRated';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route path="/now-playing" component={NowPlaying} />
        <Route path="/top-rated" component={TopRated} />
        <Route path="/genres/:genreId/:genreName" component={MoviesByGenre} />
        <Route path="/genres" component={Genres} />
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/person/:id" component={PersonDetails} />
      </Switch>
    </div>
  )
}

export default App
