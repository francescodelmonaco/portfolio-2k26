'use client';

import Image from "next/image";
import { CSSProperties, memo } from "react";

interface SkillIconProps {
    name: string;
    icon: string;
    className?: string;
    style?: CSSProperties;
}

const SkillIcon = memo(function SkillIcon({
    name,
    icon,
    className = "h-full w-auto object-contain",
    style = {}
}: SkillIconProps) {
    return (
        <Image
            src={icon}
            alt={`${name} icon`}
            title={name}
            width={24}
            height={24}
            loading="lazy"
            className={className}
            style={{
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                ...style
            }}
        />
    );
})

SkillIcon.displayName = "SkillIcon"
export default SkillIcon
