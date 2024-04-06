import { HoverCardDemo } from '../../components/hover-card';
import SocialLinks from '../../components/social-links';

export default function HomePage() {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center bg-gray-100 gap-y-4 w-full">
      <p className="text-[200px] animate-wiggle">🌍</p>
      <h1 className="text-4xl font-bold text-primary">
        Welcome to the Container!
      </h1>
      <p className="text-lg text-primary-400">
        This is the container app that consumes the remote app info.
      </p>
      <p className="text-lg text-gray-400">
        It was created with the Nx plugin for Webpack 5.
      </p>
      <HoverCardDemo />
      <SocialLinks />
    </div>
  );
}
