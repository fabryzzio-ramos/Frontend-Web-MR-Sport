import { Helmet } from "react-helmet-async";
import ContactIntro from "../components/contact/ContactIntro";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";

function Contact() {
    return (
        <>
            <Helmet>
                <title>MR Sport | Club Deportivo Oficial</title>
                <meta name="descripcion" content="MR Sport es un club deportivo basado en pasión, disciplina y familia.
                Conoce el equipo, partidos y tienda oficial." 
                />
            </Helmet>
            <ContactIntro />
            <ContactInfo />
            <ContactForm />
        </>
    );
}

export default Contact;