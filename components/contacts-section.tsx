import { Github, Linkedin, FileUser, Mail } from "lucide-react";
import Card from "./ui/card";
import ContactCard from "./ui/contact-card";

export default function ContactsSection() {
    return (
        <div className="flex flex-col gap-1 h-1/4 mt-7">
            <span className="text-xl font-bold">contacts</span>

            <Card className="flex items-center justify-between gap-3">
                <ContactCard
                    link="https://github.com/francescodelmonaco"
                    children={<Github className="w-10 h-10" />}
                />
                <ContactCard
                    link="https://linkedin.com/in/francescodelmonaco"
                    children={<Linkedin className="w-10 h-10" />}
                />
                <ContactCard
                    link="/documents/cv-francesco-delmonaco.pdf"
                    children={<FileUser className="w-10 h-10" />}
                />
                <ContactCard
                    link="mailto:francescodelmonaco1999@gmail.com"
                    children={<Mail className="w-10 h-10" />}
                />
            </Card>
        </div>
    )
}