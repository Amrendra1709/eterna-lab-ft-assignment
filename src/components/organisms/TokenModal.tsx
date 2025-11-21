import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Token } from '@/types/token.types';
import { TokenLogo } from '@/components/molecules/TokenLogo';
import { PriceDisplay } from '@/components/molecules/PriceDisplay';
import { PercentageDisplay } from '@/components/molecules/PercentageDisplay';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Twitter, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TokenChart } from '@/components/molecules/TokenChart';
import { TransactionHistory } from '@/components/molecules/TransactionHistory';

interface TokenDetailModalProps {
    token: Token | null;
    isOpen: boolean;
    onClose: () => void;
}

export const TokenDetailModal = ({ token, isOpen, onClose }: TokenDetailModalProps) => {
    if (!token) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] bg-card border-border">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <TokenLogo token={token} size={48} />
                        <div>
                            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                {token.name} <span className="text-muted-foreground text-base">({token.ticker})</span>
                            </DialogTitle>
                            <div className="flex items-center gap-2 mt-1">
                                <PriceDisplay price={token.price} className="text-lg font-bold" />
                                <PercentageDisplay value={token.priceChange24h} />
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="overview" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="chart">Chart</TabsTrigger>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1 p-3 rounded bg-muted/30">
                                <p className="text-sm text-muted-foreground">Market Cap</p>
                                <p className="font-medium text-lg">${token.marketCap.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1 p-3 rounded bg-muted/30">
                                <p className="text-sm text-muted-foreground">Liquidity</p>
                                <p className="font-medium text-lg">${token.liquidity.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1 p-3 rounded bg-muted/30">
                                <p className="text-sm text-muted-foreground">Volume 24h</p>
                                <p className="font-medium text-lg">${token.volume24h.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1 p-3 rounded bg-muted/30">
                                <p className="text-sm text-muted-foreground">Holders</p>
                                <p className="font-medium text-lg">{token.holders.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                                <h4 className="font-semibold text-sm">Contract Address</h4>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 p-2 rounded bg-background text-xs font-mono border border-border">
                                        {token.id}
                                    </code>
                                    <Button size="icon" variant="ghost" className="h-8 w-8">
                                        <Copy size={14} />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button className="flex-1 gap-2">
                                    <Globe size={16} /> Website
                                </Button>
                                <Button className="flex-1 gap-2" variant="outline">
                                    <Twitter size={16} /> Twitter
                                </Button>
                                <Button className="flex-1 gap-2" variant="outline">
                                    <ExternalLink size={16} /> Scan
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="chart" className="mt-4">
                        <TokenChart token={token} />
                    </TabsContent>

                    <TabsContent value="transactions" className="mt-4">
                        <TransactionHistory token={token} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
