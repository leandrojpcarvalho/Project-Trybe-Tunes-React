import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Loading from './pages/Loading';
import Search from './pages/Search';
import Album from './Components/Album';
import Layout from './pages/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/loading" element={ <Loading /> } />
        <Route path="/album/:id" element={ <Album /> } />
      </Route>
    </Routes>
  );
}

export default App;
