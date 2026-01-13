interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`glass p-5 rounded-2xl h-full ${className}`}>
            {children}
        </div>
    );
}