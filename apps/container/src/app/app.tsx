import { Loader } from 'lucide-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from '../routes';

export function App() {
  return (
    <RouterProvider
      fallbackElement={<Loader className="animate-spin" size="4rem" />}
      router={createBrowserRouter(routes)}
    />
  );
}

export default App;
