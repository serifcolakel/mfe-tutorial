const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/serifcolakel/',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/ColakelSerif',
  },
];

export default function SocialLinks() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {socialLinks.map(({ name, url }) => (
        <a
          href={url}
          key={name}
          rel="noreferrer"
          style={{ display: 'block', margin: '10px' }}
          target="_blank"
        >
          {name}
        </a>
      ))}
    </div>
  );
}
