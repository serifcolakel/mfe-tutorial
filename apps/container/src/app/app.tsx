import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const Info = React.lazy(() => import('info/InfoContainer'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/info">Info</Link>
        </li>
      </ul>
      <Routes>
        <Route element={<div>Welcome container</div>} path="/" />
        <Route element={<Info />} path="/info" />
      </Routes>
    </React.Suspense>
  );
}

export default App;
