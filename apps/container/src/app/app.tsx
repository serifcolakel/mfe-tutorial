import * as React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

const HomePage = React.lazy(() => import('../pages/home'));
const Info = React.lazy(() => import('info/InfoContainer'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: '2rem',
          margin: '1rem',
        }}
      >
        <NavLink
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'lightblue' : 'blue',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            color: 'white',
          })}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'lightblue' : 'blue',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            color: 'white',
          })}
          to="/info"
        >
          Info
        </NavLink>
      </nav>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<Info />} path="/info" />
      </Routes>
    </React.Suspense>
  );
}

export default App;
