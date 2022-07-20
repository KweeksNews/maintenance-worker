import Image from 'next/image';

type Props = {
  navLinks?: {
    name: string;
    url: string;
  }[];
};

export function Content({ navLinks }: Props) {
  return (
    <section className="min-h-screen max-w-5xl flex flex-col justify-center items-center mx-auto md:flex-row">
      <div className="md:flex-1 text-center">
        <Image
          src="/assets/images/kweeksnews-network.svg"
          alt="KweeksNews Network"
          title="KweeksNews Network"
          width={260.122}
          height={45}
        />

        <p className="text-base text-white mt-5">Dalam Pemeliharaan</p>

        <nav className="hidden mx-auto mt-12 md:flex md:justify-center">
          <ul className="flex text-center">
            {navLinks &&
              navLinks.map(({ name, url }, i) => (
                <li key={i} className="mx-3">
                  <a className="button" target="_blank" href={url} rel="noreferrer">
                    {name}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      <div className="md:flex-1">
        <div className="flex h-[350px] max-w-md items-center mx-auto mt-28 md:mt-0">
          <Image
            src="/assets/images/maintenance.svg"
            alt="Maintenance"
            width={945}
            height={583.2243}
            priority
          />
        </div>
      </div>
    </section>
  );
}
