import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO = ({
  title = 'Future Citizen Authority - Sovereign Blockchain Network',
  description = 'The absolute ledger of Identity and Trust. A parallelized L1 architecture merging sub-second finality with sovereign regulatory compliance, forging the ultimate digital statecraft foundation.',
  image = '/og-image.png',
  url = 'https://futurecitizen.io',
}: SEOProps) => {
  // 使用React Helmet需要在main.tsx中包装HelmetProvider
  // 这里返回meta标签配置供使用
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    link: [
      { rel: 'canonical', href: url },
    ],
  };
};

// 用于更新document title的hook
// eslint-disable-next-line react-refresh/only-export-components
export const usePageTitle = (title: string) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};
