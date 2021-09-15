import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './index.css';
import App from './App';
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
            <ScrollToTop />
            <App />
            <ReactQueryDevtools />
        </Router>
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
