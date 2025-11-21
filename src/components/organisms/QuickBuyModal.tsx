import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Token } from '@/types/token.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface QuickBuyModalProps {
    token: Token | null;
    isOpen: boolean;
    onClose: () => void;
}

export const QuickBuyModal = ({ token, isOpen, onClose }: QuickBuyModalProps) => {
    const [amount, setAmount] = useState('');
    const [slippage, setSlippage] = useState('1');

    if (!token) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] bg-card border-border">
                <DialogHeader>
                    <DialogTitle>Quick Buy {token.ticker}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Amount (SOL)</Label>
                        <Input
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Slippage (%)</Label>
                        <div className="flex gap-2">
                            {['0.5', '1', '2'].map((val) => (
                                <Button
                                    key={val}
                                    variant={slippage === val ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSlippage(val)}
                                    className="flex-1"
                                >
                                    {val}%
                                </Button>
                            ))}
                            <Input
                                className="w-20 text-center"
                                value={slippage}
                                onChange={(e) => setSlippage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="p-3 rounded bg-muted/50 space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Price</span>
                            <span>${token.price.toFixed(8)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Est. Received</span>
                            <span>0.00 {token.ticker}</span>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="w-full sm:w-auto bg-success hover:bg-success/90 text-white">
                        Buy {token.ticker}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
