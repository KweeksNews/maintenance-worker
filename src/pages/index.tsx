import { Config } from '../config';
import { Content, Layout } from '../components/core';

export default function Home() {
  return (
    <Layout navLinks={Config.nav}>
      <Content navLinks={Config.nav} />
    </Layout>
  );
}
