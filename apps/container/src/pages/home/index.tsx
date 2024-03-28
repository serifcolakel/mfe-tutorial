import SocialLinks from '../../components/social-links';

export default function HomePage() {
  return (
    <div
      style={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      }}
    >
      <h1>Welcome to the Container!</h1>
      <p>This is the container app that consumes the remote app info.</p>
      <p>It was created with the Nx plugin for Webpack 5.</p>
      <SocialLinks />
    </div>
  );
}
