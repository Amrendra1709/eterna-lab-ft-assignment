import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SortableHeader } from '@/components/molecules/SortableHeader';
import { SortConfig } from '@/types/token.types';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TokenTableHeaderProps {
    sortConfig: SortConfig;
    onSort: (key: string) => void;
}

export const TokenTableHeader = ({ sortConfig, onSort }: TokenTableHeaderProps) => {
    const headers = [
        { key: 'name', label: 'Token', sortable: true },
        { key: 'age', label: 'Age', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'priceChange24h', label: '24h %', sortable: true },
        { key: 'marketCap', label: 'MCap', sortable: true },
        { key: 'liquidity', label: 'Liq', sortable: true },
        { key: 'volume24h', label: 'Vol 24h', sortable: true },
        { key: 'holders', label: 'Holders', sortable: true },
        { key: 'top10HoldersPercent', label: 'Top 10%', sortable: true, info: 'Percentage held by top 10 wallets' },
        { key: 'devHoldingPercent', label: 'Dev %', sortable: true, info: 'Percentage held by developer wallet' },
        { key: 'snipersPercent', label: 'Snipers %', sortable: true, info: 'Percentage held by sniper bots' },
        { key: 'insidersPercent', label: 'Insiders %', sortable: true, info: 'Percentage held by insiders' },
        { key: 'txns', label: 'Txns', sortable: false },
        { key: 'actions', label: '', sortable: false },
    ];

    return (
        <TableHeader className="sticky top-0 z-10 bg-background/60 backdrop-blur-xl border-b border-border/40 shadow-sm">
            <TableRow className="hover:bg-transparent border-b border-border/50">
                {headers.map((header) => (
                    <TableHead key={header.key} className="whitespace-nowrap h-12 px-4 first:pl-6 last:pr-6">
                        <div className="flex items-center gap-1.5 group cursor-pointer" onClick={() => header.sortable && onSort(header.key)}>
                            {header.sortable ? (
                                <SortableHeader
                                    label={header.label}
                                    sortKey={header.key}
                                    currentSort={sortConfig}
                                    onSort={onSort}
                                />
                            ) : (
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
                                    {header.label}
                                </span>
                            )}
                            {header.info && (
                                <TooltipProvider>
                                    <Tooltip delayDuration={300}>
                                        <TooltipTrigger asChild>
                                            <Info size={12} className="text-muted-foreground/40 hover:text-primary transition-colors" />
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="bg-popover/95 backdrop-blur-sm border-border/50">
                                            <p className="text-xs font-medium">{header.info}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
    );
};
