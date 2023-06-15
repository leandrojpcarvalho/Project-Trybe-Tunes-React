import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Loading from './pages/Loading';
import Search from './pages/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/loading" element={ <Loading /> } />
      <Route path="/search" element={ <Search /> } />
    </Routes>
  );
}

export default App;
