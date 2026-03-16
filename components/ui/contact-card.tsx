import { memo } from "react"

const ContactCard = memo(function ContactCard({
    link,
    label,
    children
}: {
    link: string
    label?: string
    children: React.ReactNode
}) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-panel w-full rounded-lg flex flex-col items-center justify-center gap-4 py-4 text-white/50 hover:text-(--blue) transition-colors duration-300"
        >
            {children}
            {label && (
                <span className="text-[12px] font-mono tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                    {label}
                </span>
            )}
        </a>
    )
})

ContactCard.displayName = "ContactCard"
export default ContactCard