import { Token } from '@/types/token.types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

interface TransactionHistoryProps {
    token: Token;
}

export const TransactionHistory = ({ token }: TransactionHistoryProps) => {
    // Generate mock transactions
    const transactions = Array.from({ length: 20 }).map((_, i) => {
        const isBuy = Math.random() > 0.4;
        const amount = (Math.random() * 10 + 0.1).toFixed(2);
        const price = (token.price * (1 + (Math.random() - 0.5) * 0.1)).toFixed(8);
        const time = new Date(Date.now() - Math.random() * 1000 * 60 * 60); // Random time in last hour

        return {
            id: i,
            type: isBuy ? 'buy' : 'sell',
            amount,
            price,
            total: (parseFloat(amount) * parseFloat(price)).toFixed(4),
            maker: `...${Math.random().toString(36).substring(2, 6)}`,
            time,
        };
    }).sort((a, b) => b.time.getTime() - a.time.getTime());

    return (
        <div className="rounded-md border border-border">
            <div className="grid grid-cols-5 gap-2 p-3 bg-muted/50 text-xs font-medium text-muted-foreground border-b border-border">
                <div>Type</div>
                <div>Price</div>
                <div>Amount (SOL)</div>
                <div>Maker</div>
                <div className="text-right">Time</div>
            </div>
            <ScrollArea className="h-[250px]">
                <div className="divide-y divide-border">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="grid grid-cols-5 gap-2 p-3 text-sm hover:bg-muted/30 transition-colors">
                            <div className={tx.type === 'buy' ? 'text-success font-medium' : 'text-error font-medium'}>
                                {tx.type.toUpperCase()}
                            </div>
                            <div className="font-mono text-xs">${tx.price}</div>
                            <div className="font-mono text-xs">{tx.amount}</div>
                            <div className="text-muted-foreground text-xs font-mono">{tx.maker}</div>
                            <div className="text-right text-muted-foreground text-xs">
                                {formatDistanceToNow(tx.time, { addSuffix: true }).replace('about ', '')}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
