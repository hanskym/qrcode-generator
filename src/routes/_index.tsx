import ControlPanel from '@/components/ControlPanel';

import { siteConfig } from '@/config/site';

export function meta() {
  return [
    { title: siteConfig.name },
    {
      name: 'description',
      content: siteConfig.description,
    },
    { name: 'keywords', content: siteConfig.keywords },
    { name: 'author', content: siteConfig.aboutMe.altName },
    { name: 'creator', content: siteConfig.aboutMe.fullName },
    { name: 'generator', content: 'React Router' },
    { name: 'robots', content: 'index, follow' },

    // Twitter meta tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: siteConfig.aboutMe.socials.twitterUsername },
    { name: 'twitter:title', content: siteConfig.name },
    { name: 'twitter:description', content: siteConfig.description },
    { name: 'twitter:image', content: siteConfig.ogImage },

    // OpenGraph meta tags
    { property: 'og:title', content: siteConfig.name },
    { property: 'og:description', content: siteConfig.description },
    { property: 'og:image', content: siteConfig.ogImage },
    { property: 'og:url', content: siteConfig.url },
    { property: 'og:site_name', content: siteConfig.name },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_US' },
  ];
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center py-4">
      <ControlPanel />
    </div>
  );
}
