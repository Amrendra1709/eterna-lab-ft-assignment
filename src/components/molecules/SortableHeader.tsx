import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SortableHeaderProps {
    label: string;
    sortKey: string;
    currentSort: { column: string | null; direction: 'asc' | 'desc' | null };
    onSort: (key: string) => void;
    className?: string;
    align?: 'left' | 'right' | 'center';
}

export const SortableHeader = ({
    label,
    sortKey,
    currentSort,
    onSort,
    className,
    align = 'left',
}: SortableHeaderProps) => {
    const isSorted = currentSort.column === sortKey;
    const direction = isSorted ? currentSort.direction : null;

    return (
        <Button
            variant="ghost"
            size="sm"
            className={cn(
                '-ml-3 h-8 data-[state=open]:bg-accent hover:bg-transparent hover:text-primary',
                align === 'right' && 'ml-auto flex-row-reverse',
                align === 'center' && 'mx-auto',
                className
            )}
            onClick={() => onSort(sortKey)}
        >
            <span>{label}</span>
            {direction === 'desc' ? (
                <ArrowDown className="ml-2 h-3 w-3" />
            ) : direction === 'asc' ? (
                <ArrowUp className="ml-2 h-3 w-3" />
            ) : (
                <ArrowUpDown className="ml-2 h-3 w-3 opacity-50" />
            )}
        </Button>
    );
};
