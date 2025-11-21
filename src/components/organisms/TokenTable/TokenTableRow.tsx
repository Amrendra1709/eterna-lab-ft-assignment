import { memo } from 'react';
import { Token } from '@/types/token.types';
import { TableCell, TableRow } from '@/components/ui/table';
import { TokenLogo } from '@/components/molecules/TokenLogo';
import { PriceDisplay } from '@/components/molecules/PriceDisplay';
import { PercentageDisplay } from '@/components/molecules/PercentageDisplay';
import { TransactionCount } from '@/components/molecules/TransactionCount';
import { QuickBuyButton } from '@/components/molecules/QuickBuyButton';
import { TokenHoverCard } from '@/components/molecules/TokenHoverCard';
import { PercentageHoverCard } from '@/components/molecules/PercentageHoverCard';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface TokenTableRowProps {
    token: Token;
    style?: React.CSSProperties;
    className?: string;
    onOpenDetails: (token: Token) => void;
    onOpenQuickBuy: (token: Token) => void;
}

export const TokenTableRow = memo(({ token, style, className, onOpenDetails, onOpenQuickBuy }: TokenTableRowProps) => {
    const formatMarketCap = (mcap: number) => {
        if (mcap >= 1000000) return `$${(mcap / 1000000).toFixed(1)}M`;
        if (mcap >= 1000) return `$${(mcap / 1000).toFixed(1)}K`;
        return `$${mcap.toFixed(0)}`;
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const isNew = (Date.now() - new Date(token.createdAt).getTime()) < 60000; // New if < 1 min old

    return (
        <TableRow
            className={cn(
                'transition-all duration-200 cursor-pointer border-b border-border/30',
                isNew ? 'bg-success/10 hover:bg-success/20 animate-slide-down' : 'hover:bg-white/5 hover:shadow-lg hover:shadow-primary/5',
                className
            )}
            style={style}
            onClick={() => onOpenDetails(token)}
        >
            <TableCell className="min-w-[200px]">
                <TokenHoverCard token={token}>
                    <div className="flex items-center gap-3 w-full">
                        <TokenLogo token={token} size={32} />
                        <div className="flex flex-col">
                            <span className="font-bold text-foreground">{token.ticker}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[100px]">{token.name}</span>
                        </div>
                    </div>
                </TokenHoverCard>
            </TableCell>
            <TableCell className="text-muted-foreground whitespace-nowrap">
                {formatDistanceToNow(token.createdAt, { addSuffix: true }).replace('about ', '')}
            </TableCell>
            <TableCell>
                <PriceDisplay price={token.price} />
            </TableCell>
            <TableCell>
                <PercentageDisplay value={token.priceChange24h} />
            </TableCell>
            <TableCell className="text-foreground font-medium">
                {formatMarketCap(token.marketCap)}
            </TableCell>
            <TableCell className="text-muted-foreground">
                ${formatNumber(token.liquidity)}
            </TableCell>
            <TableCell className="text-muted-foreground">
                ${formatNumber(token.volume24h)}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {formatNumber(token.holders)}
            </TableCell>
            <TableCell>
                <PercentageHoverCard
                    title="Top 10 Holders"
                    value={token.top10HoldersPercent}
                    description="Percentage of supply held by the top 10 wallets."
                    warningThreshold={60}
                >
                    <div>
                        <PercentageDisplay
                            value={token.top10HoldersPercent}
                            showPlus={false}
                            warningThreshold={60}
                            className={token.top10HoldersPercent > 60 ? 'text-warning' : 'text-muted-foreground'}
                        />
                    </div>
                </PercentageHoverCard>
            </TableCell>
            <TableCell>
                <PercentageHoverCard
                    title="Developer Holding"
                    value={token.devHoldingPercent}
                    description="Percentage of supply held by the developer wallet."
                    warningThreshold={20}
                >
                    <div>
                        <PercentageDisplay
                            value={token.devHoldingPercent}
                            showPlus={false}
                            warningThreshold={20}
                            className={token.devHoldingPercent > 20 ? 'text-warning' : 'text-muted-foreground'}
                        />
                    </div>
                </PercentageHoverCard>
            </TableCell>
            <TableCell>
                <PercentageHoverCard
                    title="Sniper Count"
                    value={token.snipersPercent}
                    description="Estimated percentage of supply bought by sniper bots."
                    warningThreshold={30}
                >
                    <div>
                        <PercentageDisplay
                            value={token.snipersPercent}
                            showPlus={false}
                            warningThreshold={30}
                            className={token.snipersPercent > 30 ? 'text-warning' : 'text-muted-foreground'}
                        />
                    </div>
                </PercentageHoverCard>
            </TableCell>
            <TableCell>
                <PercentageHoverCard
                    title="Insider Holding"
                    value={token.insidersPercent}
                    description="Estimated percentage of supply held by insiders."
                    warningThreshold={40}
                >
                    <div>
                        <PercentageDisplay
                            value={token.insidersPercent}
                            showPlus={false}
                            warningThreshold={40}
                            className={token.insidersPercent > 40 ? 'text-warning' : 'text-muted-foreground'}
                        />
                    </div>
                </PercentageHoverCard>
            </TableCell>
            <TableCell>
                <TransactionCount buys={token.buyCount} sells={token.sellCount} />
            </TableCell>
            <TableCell>
                <QuickBuyButton onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onOpenQuickBuy(token);
                }} />
            </TableCell>
        </TableRow>
    );
}, (prev, next) => {
    return (
        prev.token.id === next.token.id &&
        prev.token.price === next.token.price &&
        prev.token.volume24h === next.token.volume24h &&
        prev.token.buyCount === next.token.buyCount &&
        prev.token.sellCount === next.token.sellCount
    );
});

TokenTableRow.displayName = 'TokenTableRow';
