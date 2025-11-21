import { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps extends LucideProps {
    icon: LucideIcon;
}

export const Icon = ({ icon: IconComponent, className, ...props }: IconProps) => {
    return <IconComponent className={cn('h-4 w-4', className)} {...props} />;
};
