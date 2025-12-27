import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeaturedDestinations from '../components/FeaturedDestinations';
import SearchSection from '../components/SearchSection';
import WellnessGallery from '../components/WellnessGallery';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <>
      <Head>
        <title>Karoba Wellness Travel Colombia - Experiencias Exclusivas de Bienestar</title>
        <meta name="description" content="Descubre experiencias transformadoras de wellness en Colombia. Retiros espirituales, spas exclusivos y medicina ancestral en los destinos más auténticos." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/karoba-logo.jpeg" />
        <link rel="apple-touch-icon" href="/images/karoba-logo.jpeg" />
      </Head>
      
      <Layout>
        <Hero />
        <SearchSection />
        <FeaturedDestinations />
        <WellnessGallery />
        <Testimonials />
      </Layout>
    </>
  );
}