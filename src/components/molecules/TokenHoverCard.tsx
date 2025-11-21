import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Token } from '@/types/token.types';
import { TokenLogo } from '@/components/molecules/TokenLogo';
import { PriceDisplay } from '@/components/molecules/PriceDisplay';
import { PercentageDisplay } from '@/components/molecules/PercentageDisplay';
import { formatDistanceToNow } from 'date-fns';
import { CalendarDays, Users, Droplets, Activity } from 'lucide-react';

interface TokenHoverCardProps {
    token: Token;
    children: React.ReactNode;
}

export const TokenHoverCard = ({ token, children }: TokenHoverCardProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-card border-border">
                <div className="flex justify-between space-x-4">
                    <TokenLogo token={token} size={40} />
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@{token.ticker}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {token.name}
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                                Created {formatDistanceToNow(token.createdAt, { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground">Volume 24h</span>
                            <span className="text-xs font-medium">${token.volume24h.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground">Liquidity</span>
                            <span className="text-xs font-medium">${token.liquidity.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground">Holders</span>
                            <span className="text-xs font-medium">{token.holders.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                        <PriceDisplay price={token.price} className="text-sm font-bold" />
                        <PercentageDisplay value={token.priceChange24h} className="text-xs" />
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
