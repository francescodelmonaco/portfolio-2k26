import { memo } from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card = memo(function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`glass p-5 rounded-2xl h-full ${className}`}>
            {children}
        </div>
    );
});

Card.displayName = "Card";
export default Card;