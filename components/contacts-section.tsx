import { memo, useMemo } from "react";
import { Github, Linkedin, FileUser, Mail } from "lucide-react";
import Card from "./ui/card";
import ContactCard from "./ui/contact-card";

const ContactsSection = memo(function ContactsSection({ className = "" }: { className?: string }) {
    const contacts = useMemo(() => [
        {
            link: "https://github.com/francescodelmonaco",
            icon: <Github size={40} />,
            label: "GitHub"
        },
        {
            link: "https://linkedin.com/in/francescodelmonaco",
            icon: <Linkedin size={40} />,
            label: "LinkedIn"
        },
        {
            link: "/documents/cv-francesco-delmonaco.pdf",
            icon: <FileUser size={40} />,
            label: "CV"
        },
        {
            link: "mailto:francescodelmonaco1999@gmail.com",
            icon: <Mail size={40} />,
            label: "Email"
        }
    ], []);

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {/* section label */}
            <div className="flex items-center gap-3">
                <span className="text-[12px] font-mono tracking-[0.25em] uppercase text-(--gray)">03 / Contacts</span>
                <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <Card className="grid grid-cols-2 md:flex items-stretch justify-between gap-4 py-4">
                {contacts.map((contact, index) => (
                    <ContactCard
                        key={index}
                        link={contact.link}
                        label={contact.label}
                    >
                        {contact.icon}
                    </ContactCard>
                ))}
            </Card>
        </div>
    )
})

ContactsSection.displayName = "ContactsSection"
export default ContactsSection