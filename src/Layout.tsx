import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function layout() {
  return (
    <Routes>
      <Route path="/" Component={ <Login /> } />
    </Routes>
  )
}