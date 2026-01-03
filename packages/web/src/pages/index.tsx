import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import AboutExperience from '../components/AboutExperience';
import Testimonials from '../components/Testimonials';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <Head>
        <title>{t('meta.home.title')}</title>
        <meta name="description" content={t('meta.home.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/karoba-logo.jpeg" />
        <link rel="apple-touch-icon" href="/images/karoba-logo.jpeg" />
      </Head>
      
      <Layout>
        <Hero />
        <AboutExperience />
        <Testimonials />
      </Layout>
    </>
  );
}