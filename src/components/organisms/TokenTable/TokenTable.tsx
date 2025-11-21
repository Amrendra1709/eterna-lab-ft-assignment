import { useRef, useState, useMemo } from 'react';
import { Token, SortConfig } from '@/types/token.types';
import { Table } from '@/components/ui/table';
import { TokenTableHeader } from './TokenTableHeader';
import { TokenTableBody } from './TokenTableBody';
import { cn } from '@/lib/utils';

interface TokenTableProps {
    tokens: Token[];
    className?: string;
    onOpenDetails: (token: Token) => void;
    onOpenQuickBuy: (token: Token) => void;
}

export const TokenTable = ({ tokens, className, onOpenDetails, onOpenQuickBuy }: TokenTableProps) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        column: null,
        direction: null,
    });

    const handleSort = (key: string) => {
        setSortConfig((current) => {
            if (current.column === key) {
                if (current.direction === 'asc') return { column: key, direction: 'desc' };
                if (current.direction === 'desc') return { column: null, direction: null };
            }
            return { column: key as keyof Token, direction: 'asc' };
        });
    };

    const sortedTokens = useMemo(() => {
        if (!sortConfig.column || !sortConfig.direction) return tokens;

        return [...tokens].sort((a, b) => {
            const aValue = a[sortConfig.column!];
            const bValue = b[sortConfig.column!];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }

            // Handle dates
            if (aValue instanceof Date && bValue instanceof Date) {
                return sortConfig.direction === 'asc'
                    ? aValue.getTime() - bValue.getTime()
                    : bValue.getTime() - aValue.getTime();
            }

            return 0;
        });
    }, [tokens, sortConfig]);

    return (
        <div
            ref={parentRef}
            className={cn('rounded-xl border border-border/40 shadow-2xl bg-card/30 backdrop-blur-sm overflow-auto h-full', className)}
        >
            <Table>
                <TokenTableHeader sortConfig={sortConfig} onSort={handleSort} />
                <TokenTableBody
                    tokens={sortedTokens}
                    parentRef={parentRef}
                    onOpenDetails={onOpenDetails}
                    onOpenQuickBuy={onOpenQuickBuy}
                />
            </Table>
        </div>
    );
};
