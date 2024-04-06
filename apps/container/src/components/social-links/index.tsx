const socialLinks = [
  {
    name: '🔗 LinkedIn',
    url: 'https://www.linkedin.com/in/serifcolakel/',
  },
  {
    name: '🔗 Twitter',
    url: 'https://twitter.com/ColakelSerif',
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-row items-center justify-center w-full py-4 bg-white border divide-x-2 divide-black rounded-lg md:w-1/3">
      {socialLinks.map(({ name, url }) => (
        <a
          className="px-4 text-xl hover:underline text-primary-400"
          href={url}
          key={name}
          rel="noreferrer"
          target="_blank"
        >
          {name}
        </a>
      ))}
    </div>
  );
}
