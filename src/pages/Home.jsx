import { Helmet } from "react-helmet-async";
import Hero from "../components/home/Hero";
import AboutClub from "../components/home/AboutClub";
import NextMatch from "../components/home/NextMatch";
import FeaturedPlayers from "../components/home/FeaturedPlayers";
import StorePreview from "../components/home/StorePreview";   
import Contact from "../components/home/Contact";

function Home() {
    return (
        <>
            <Helmet>
                <title>MR Sport | Club Deportivo Oficial</title>
                <meta name="descripcion" content="MR Sport es un club deportivo basado en pasión, disciplina y familia.
                Conoce el equipo, partidos y tienda oficial." 
                />
            </Helmet>

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