'use client';

import { useState } from 'react';
import { useTokens } from '@/hooks/useTokens';
import { TokenTable } from '@/components/organisms/TokenTable/TokenTable';
import { TableSkeleton } from '@/components/organisms/TokenTable/TableSkeleton';
import { ErrorState } from '@/components/organisms/ErrorBoundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWebSocket } from '@/hooks/useWebSocket';
import { FilterSidebar } from '@/components/organisms/FilterSidebar';
import { useTableFilters } from '@/hooks/useTableFilters';
import { TokenDetailModal } from '@/components/organisms/TokenModal';
import { QuickBuyModal } from '@/components/organisms/QuickBuyModal';
import { Token } from '@/types/token.types';

export default function PulsePage() {
  // Enable real-time updates
  useWebSocket();

  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);

  const { tokens: newTokens, loading: isNewLoading, error: newError } = useTokens('new');
  const { tokens: finalTokens, loading: isFinalLoading, error: finalError } = useTokens('final');
  const { tokens: migratedTokens, loading: isMigratedLoading, error: migratedError } = useTokens('migrated');

  const isNewError = !!newError;
  const isFinalError = !!finalError;
  const isMigratedError = !!migratedError;

  const filteredNewTokens = useTableFilters(newTokens || []);
  const filteredFinalTokens = useTableFilters(finalTokens || []);
  const filteredMigratedTokens = useTableFilters(migratedTokens || []);

  const handleOpenDetails = (token: Token) => {
    setSelectedToken(token);
    setIsDetailOpen(true);
  };

  const handleOpenQuickBuy = (token: Token) => {
    setSelectedToken(token);
    setIsQuickBuyOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <FilterSidebar />

      <div className="flex-1 p-6 space-y-8 overflow-hidden">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Token Discovery</h1>
          <p className="text-muted-foreground">Real-time feed of new and trending tokens across the ecosystem.</p>
        </div>

        <Tabs defaultValue="new" className="w-full space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-[400px] grid-cols-3 bg-card/50 backdrop-blur-md border border-border/40 shadow-lg p-1">
              <TabsTrigger value="new" className="data-[state=active]:bg-primary/20 data-[state=active]:shadow-md transition-all">New Pairs</TabsTrigger>
              <TabsTrigger value="final" className="data-[state=active]:bg-primary/20 data-[state=active]:shadow-md transition-all">Final Stretch</TabsTrigger>
              <TabsTrigger value="migrated" className="data-[state=active]:bg-primary/20 data-[state=active]:shadow-md transition-all">Migrated</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="new" className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>New Pairs ({filteredNewTokens.length})</CardTitle>
                <CardDescription>Freshly launched tokens in the last 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                {isNewLoading ? (
                  <TableSkeleton />
                ) : isNewError ? (
                  <ErrorState onRetry={() => window.location.reload()} />
                ) : (
                  <TokenTable
                    tokens={filteredNewTokens}
                    onOpenDetails={handleOpenDetails}
                    onOpenQuickBuy={handleOpenQuickBuy}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="final" className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Final Stretch ({filteredFinalTokens.length})</CardTitle>
                <CardDescription>Tokens approaching bonding curve completion.</CardDescription>
              </CardHeader>
              <CardContent>
                {isFinalLoading ? (
                  <TableSkeleton />
                ) : isFinalError ? (
                  <ErrorState onRetry={() => window.location.reload()} />
                ) : (
                  <TokenTable
                    tokens={filteredFinalTokens}
                    onOpenDetails={handleOpenDetails}
                    onOpenQuickBuy={handleOpenQuickBuy}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="migrated" className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Migrated to Raydium ({filteredMigratedTokens.length})</CardTitle>
                <CardDescription>Successful tokens that have graduated to DEX.</CardDescription>
              </CardHeader>
              <CardContent>
                {isMigratedLoading ? (
                  <TableSkeleton />
                ) : isMigratedError ? (
                  <ErrorState onRetry={() => window.location.reload()} />
                ) : (
                  <TokenTable
                    tokens={filteredMigratedTokens}
                    onOpenDetails={handleOpenDetails}
                    onOpenQuickBuy={handleOpenQuickBuy}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <TokenDetailModal
        token={selectedToken}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      <QuickBuyModal
        token={selectedToken}
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
      />
    </div>
  );
}
