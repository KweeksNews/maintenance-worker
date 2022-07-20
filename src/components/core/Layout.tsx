import Head from 'next/head';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { Config } from '../../config';
import { useOnClickOutside } from '../../hooks';
import { Footer } from './Footer';
import { Menu } from './Menu';

type Props = {
  navLinks?: {
    name: string;
    url: string;
  }[];
  children?: ReactNode;
};

export function Layout({ navLinks, children }: Props) {
  const seo = {
    title: Config.site.title,
    description: Config.site.description,
  };

  const ref = useRef<any>(null);
  const [toggled, setToggled] = useState(false);
  const callback = useCallback(() => setToggled(false), []);

  useOnClickOutside(ref, callback);

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="title" content={seo.title} />
        <meta name="description" content={seo.description} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>

      <a
        href="#content"
        className="button absolute top-2 -left-96 z-[-99] focus:left-2 focus:z-50 active:left-2 active:z-50"
      >
        Skip to Content
      </a>

      <div className="bg-chinese-black-900">
        <div ref={ref}>
          <Menu toggled={toggled} setToggled={setToggled} navLinks={navLinks} />
        </div>
        <main id="content" className="px-7">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
