import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
    price: number;
    className?: string;
}

export const PriceDisplay = ({ price, className }: PriceDisplayProps) => {
    const prevPriceRef = useRef(price);
    const [flash, setFlash] = useState<'up' | 'down' | null>(null);

    useEffect(() => {
        if (price > prevPriceRef.current) {
            setFlash('up');
        } else if (price < prevPriceRef.current) {
            setFlash('down');
        }
        prevPriceRef.current = price;

        const timer = setTimeout(() => setFlash(null), 500);
        return () => clearTimeout(timer);
    }, [price]);

    const formatPrice = (val: number) => {
        if (val < 0.000001) return val.toExponential(4);
        return val.toFixed(8); // Show more decimals for small tokens
    };

    return (
        <div
            className={cn(
                'font-mono transition-colors duration-300 px-1 rounded',
                flash === 'up' && 'animate-price-flash-up text-success',
                flash === 'down' && 'animate-price-flash-down text-danger',
                !flash && 'text-foreground',
                className
            )}
        >
            ${formatPrice(price)}
        </div>
    );
};
