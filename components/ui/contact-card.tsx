import Link from "next/link"
import { memo } from "react"

const ContactCard = memo(function ContactCard({ link, children }: { link: string, children: React.ReactNode }) {
    return (
        <Link
            href={link}
            target="_blank"
            className="bg-(--white)/10 hover:bg-(--white)/20 transition-all duration-300 p-5 w-1/4 rounded-lg h-full cursor-pointer hover:scale-102 hover:shadow-lg flex items-center justify-center"
        >
            {children}
        </Link>
    )
})

ContactCard.displayName = "ContactCard"
export default ContactCard