import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react'; // Added React import for React.MouseEvent

interface QuickBuyButtonProps {
    onClick: (e: React.MouseEvent) => void;
    className?: string;
}

export const QuickBuyButton = ({ onClick, className }: QuickBuyButtonProps) => {
    return (
        <Button
            size="sm"
            variant="outline"
            className={cn(
                "h-8 px-3 bg-success/10 text-success hover:bg-success/20 hover:text-success border-success/20",
                className
            )}
            onClick={onClick}
        >
            Quick Buy
        </Button>
    );
};
