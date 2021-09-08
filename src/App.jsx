import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NowPlaying from './pages/NowPlaying';
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
        <Route path="/genres" component={Popular} />
      </Switch>
    </div>
  )
}

export default App
