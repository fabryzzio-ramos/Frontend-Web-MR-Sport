import Hero from "../components/home/Hero";
import AboutClub from "../components/home/AboutClub";
import NextMatch from "../components/home/NextMatch";
import FeaturedPlayers from "../components/home/FeaturedPlayers";
import StorePreview from "../components/home/StorePreview";   
import Contact from "../components/home/Contact";

import useSEO from "../hooks/useSEO";

function Home() {
    useSEO({
        title: "MR Sport | Club Deportivo Oficial",
        description: "MR Sport es un club deportivo con historia, equipo competitivo, partidos oficiales y tienda del club"
    });
    
    return (
        <>
            <Hero />
            <NextMatch />
            <FeaturedPlayers />
            <AboutClub />
            <StorePreview />
            <Contact />
        </>
    );
}

export default Home;