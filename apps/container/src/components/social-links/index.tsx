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
    <div className="flex flex-row divide-x-2 md:w-1/3 w-full divide-black justify-center items-center border py-4 rounded-lg bg-white">
      {socialLinks.map(({ name, url }) => (
        <a
          className="px-4 hover:underline text-primary-400 text-xl"
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
