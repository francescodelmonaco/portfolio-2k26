import { memo, useMemo } from "react";
import { Github, Linkedin, FileUser, Mail } from "lucide-react";
import Card from "./ui/card";
import ContactCard from "./ui/contact-card";

const ContactsSection = memo(function ContactsSection() {
    const contacts = useMemo(() => [
        {
            link: "https://github.com/francescodelmonaco",
            icon: <Github className="w-5 lg:w-10 h-5 lg:h-10" />
        },
        {
            link: "https://linkedin.com/in/francescodelmonaco",
            icon: <Linkedin className="w-5 lg:w-10 h-5 lg:h-10" />
        },
        {
            link: "/documents/cv-francesco-delmonaco.pdf",
            icon: <FileUser className="w-5 lg:w-10 h-5 lg:h-10" />
        },
        {
            link: "mailto:francescodelmonaco1999@gmail.com",
            icon: <Mail className="w-5 lg:w-10 h-5 lg:h-10" />
        }
    ], []);

    return (
        <div className="flex flex-col gap-1 h-1/4 lg:mt-7 xl:mt-0">
            <span className="text-xl font-bold font-mono">contacts</span>

            <Card className="flex items-center justify-between gap-3">
                {contacts.map((contact, index) => (
                    <ContactCard
                        key={index}
                        link={contact.link}
                        children={contact.icon}
                    />
                ))}
            </Card>
        </div>
    )
})

ContactsSection.displayName = "ContactsSection"
export default ContactsSection