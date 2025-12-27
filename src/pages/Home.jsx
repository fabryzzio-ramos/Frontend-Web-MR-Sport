import Hero from "../components/home/Hero";
import AboutClub from "../components/home/AboutClub";
import NextMatch from "../components/home/NextMatch";
import FeaturedPlayers from "../components/home/FeaturedPlayers";
import StorePreview from "../components/home/StorePreview";   
import Contact from "../components/home/Contact";

function Home() {
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