import Link from "next/link"
import { memo } from "react"

const ContactCard = memo(function ContactCard({ link, children }: { link: string, children: React.ReactNode }) {
    return (
        <Link
            href={link}
            target="_blank"
            className="glass-panel w-full h-full rounded-2xl flex items-center justify-center text-white/70 hover:text-white"
        >
            {children}
        </Link>
    )
})

ContactCard.displayName = "ContactCard"
export default ContactCard