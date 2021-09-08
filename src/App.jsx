import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Popular from './pages/Popular';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route path="/now-playing" component={Popular} />
        <Route path="/top-rated" component={Popular} />
        <Route path="/genres" component={Popular} />
      </Switch>
    </div>
  )
}

export default App
