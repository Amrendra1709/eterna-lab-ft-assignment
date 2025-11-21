import { cn } from '@/lib/utils';

interface TransactionCountProps {
    buys: number;
    sells: number;
    className?: string;
}

export const TransactionCount = ({ buys, sells, className }: TransactionCountProps) => {
    return (
        <div className={cn('flex items-center gap-2 text-xs', className)}>
            <span className="text-success">{buys}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-danger">{sells}</span>
        </div>
    );
};
