import { Badge } from '@mfe-tutorial/ui';
import { BadgeAlert, BadgeCheck } from 'lucide-react';

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
    <section className="flex flex-col items-center justify-center w-full gap-y-4">
      <Badge className="gap-x-2" variant="secondary">
        <BadgeCheck />
        Primary Badge
      </Badge>
      <Badge className="gap-x-2" variant="default">
        <BadgeCheck />
        Shadcn Badge
      </Badge>
      <Badge className="gap-x-2" variant="destructive">
        <BadgeAlert />
        Destructive Badge
      </Badge>
      <div className="flex flex-row items-center justify-center w-full py-4 bg-white border divide-x-2 divide-black rounded-lg md:w-1/3">
        {socialLinks.map(({ name, url }) => (
          <a
            className="px-4 text-xl hover:underline text-primary"
            href={url}
            key={name}
            rel="noreferrer"
            target="_blank"
          >
            {name}
          </a>
        ))}
      </div>
    </section>
  );
}
