import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Token } from '@/types/token.types';

interface TokenLogoProps {
    token: Token;
    size?: number;
    className?: string;
}

export const TokenLogo = ({ token, size = 32, className }: TokenLogoProps) => {
    const [error, setError] = useState(false);

    return (
        <div
            className={cn('relative overflow-hidden rounded-full bg-muted', className)}
            style={{ width: size, height: size }}
        >
            {!error ? (
                <Image
                    src={token.logoUrl}
                    alt={token.name}
                    width={size}
                    height={size}
                    className="object-cover"
                    onError={() => setError(true)}
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-bold text-primary">
                    {token.ticker.slice(0, 2)}
                </div>
            )}
        </div>
    );
};
