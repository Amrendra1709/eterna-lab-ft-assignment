import { useVirtualizer } from '@tanstack/react-virtual';
import { Token } from '@/types/token.types';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import { TokenTableRow } from './TokenTableRow';

interface TokenTableBodyProps {
    tokens: Token[];
    parentRef: React.RefObject<HTMLDivElement | null>;
    onOpenDetails: (token: Token) => void;
    onOpenQuickBuy: (token: Token) => void;
}

export const TokenTableBody = ({ tokens, parentRef, onOpenDetails, onOpenQuickBuy }: TokenTableBodyProps) => {
    const rowVirtualizer = useVirtualizer({
        count: tokens.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 64, // Row height
        overscan: 5,
    });

    if (tokens.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={14} className="h-24 text-center text-muted-foreground">
                        No tokens found matching your criteria.
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
        <TableBody
            style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
            }}
        >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const token = tokens[virtualRow.index];
                return (
                    <TokenTableRow
                        key={token.id}
                        token={token}
                        onOpenDetails={onOpenDetails}
                        onOpenQuickBuy={onOpenQuickBuy}
                        style={{
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                        }}
                    />
                );
            })}
        </TableBody>
    );
};
