import ContactIntro from "../components/contact/ContactIntro";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";

import useSEO from "../hooks/useSEO";

function Contact() {
    useSEO({
        title: "Contacto | Club Deportivo Oficial",
        description: "Contacto oficial de MR Sport."
    });
    return (
        <>
            <ContactIntro />
            <ContactInfo />
            <ContactForm />
        </>
    );
}

export default Contact;