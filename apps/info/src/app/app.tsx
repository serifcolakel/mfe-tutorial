import { ContextMenuDemo } from '../components/context-menu';

export function App() {
  return (
    <main>
      <h1>Welcome to info!</h1>
      <p>This is a remote app that is part of the Nx plugin for Webpack 5.</p>
      <section className="p-4 rounded-lg shadow-sm bg-gray-50">
        <h2 className="text-4xl font-bold text-center border-b-4 border-b-primary py-[41px]">
          <p className="p-8 animate-wiggle text-primary-700">Info</p>
        </h2>
        <p className="text-lg text-center my-[41px]">
          This app is a remote app that is part of the Nx plugin for Webpack 5.
        </p>
      </section>
      <ContextMenuDemo />
    </main>
  );
}

export default App;
