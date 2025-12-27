import AboutHero from "../components/about/AboutHero";
import ClubHistory from "../components/about/ClubHistory";
import ClubValues from "../components/about/ClubValues";
import AboutCTA from "../components/about/AboutCTA";

import useSEO from "../hooks/useSEO";

function About() {
    useSEO({
        title: "Historia | Club Deportivo Oficial",
        description: "Conoce nuestros valores y nuestra historia como equipo."
    });
    return (
        <>
            <AboutHero />
            <ClubHistory />
            <ClubValues />
            <AboutCTA />
        </>
    );
}

export default About;