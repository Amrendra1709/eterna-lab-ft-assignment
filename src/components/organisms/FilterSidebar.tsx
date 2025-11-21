import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setFilter, resetFilters } from '@/store/slices/filtersSlice';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FilterInput } from '@/components/molecules/FilterInput';
import { X } from 'lucide-react';

export const FilterSidebar = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);

    const handleRangeChange = (
        key: 'priceRange' | 'marketCapRange' | 'liquidityRange' | 'volumeRange',
        type: 'min' | 'max',
        value: string
    ) => {
        const numValue = value === '' ? null : Number(value);
        dispatch(setFilter({
            [key]: { ...filters[key], [type]: numValue }
        }));
    };

    return (
        <div className="w-80 border-r border-border/30 bg-card/40 backdrop-blur-2xl h-screen sticky top-0 flex flex-col shadow-2xl z-10">
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-card/80 backdrop-blur-md sticky top-0 z-20">
                <h3 className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Filters
                </h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(resetFilters())}
                    className="h-8 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                    Reset
                    <X className="ml-2 h-3 w-3" />
                </Button>
            </div>

            <ScrollArea className="flex-1 p-6">
                <div className="space-y-8 pb-20">
                    {/* Price Range */}
                    <div className="space-y-4 p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300">
                        <FilterInput
                            label="Price ($)"
                            min={filters.priceRange.min ?? ''}
                            max={filters.priceRange.max ?? ''}
                            onMinChange={(v) => handleRangeChange('priceRange', 'min', v)}
                            onMaxChange={(v) => handleRangeChange('priceRange', 'max', v)}
                        />
                    </div>

                    {/* Market Cap Range */}
                    <div className="space-y-4 p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300">
                        <FilterInput
                            label="Market Cap ($)"
                            min={filters.marketCapRange.min ?? ''}
                            max={filters.marketCapRange.max ?? ''}
                            onMinChange={(v) => handleRangeChange('marketCapRange', 'min', v)}
                            onMaxChange={(v) => handleRangeChange('marketCapRange', 'max', v)}
                        />
                    </div>

                    {/* Liquidity Range */}
                    <div className="space-y-4 p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300">
                        <FilterInput
                            label="Liquidity ($)"
                            min={filters.liquidityRange.min ?? ''}
                            max={filters.liquidityRange.max ?? ''}
                            onMinChange={(v) => handleRangeChange('liquidityRange', 'min', v)}
                            onMaxChange={(v) => handleRangeChange('liquidityRange', 'max', v)}
                        />
                    </div>

                    {/* Volume Range */}
                    <div className="space-y-4 p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300">
                        <FilterInput
                            label="Volume 24h ($)"
                            min={filters.volumeRange.min ?? ''}
                            max={filters.volumeRange.max ?? ''}
                            onMinChange={(v) => handleRangeChange('volumeRange', 'min', v)}
                            onMaxChange={(v) => handleRangeChange('volumeRange', 'max', v)}
                        />
                    </div>

                    {/* Top 10 Holders */}
                    <div className="space-y-4 p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top 10 Holders</Label>
                            <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                                &lt; {filters.top10HoldersMax ?? 100}%
                            </span>
                        </div>
                        <Slider
                            value={[filters.top10HoldersMax ?? 100]}
                            max={100}
                            step={1}
                            onValueChange={([val]) => dispatch(setFilter({ top10HoldersMax: val }))}
                            className="py-2"
                        />
                    </div>

                    {/* Dev Holding */}
                    <div className="space-y-4 p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dev Holding</Label>
                            <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                                &lt; {filters.devHoldingMax ?? 100}%
                            </span>
                        </div>
                        <Slider
                            value={[filters.devHoldingMax ?? 100]}
                            max={100}
                            step={1}
                            onValueChange={([val]) => dispatch(setFilter({ devHoldingMax: val }))}
                            className="py-2"
                        />
                    </div>

                    {/* Age Filter */}
                    <div className="space-y-4 p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">Token Age</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'under1h', label: '< 1h' },
                                { id: '1to6h', label: '1h - 6h' },
                                { id: '6to24h', label: '6h - 24h' },
                                { id: 'over24h', label: '> 24h' },
                            ].map((item) => (
                                <div key={item.id} className="flex items-center space-x-2 group">
                                    <Checkbox
                                        id={item.id}
                                        checked={filters.ageFilters.includes(item.id as any)}
                                        onCheckedChange={(checked) => {
                                            const current = filters.ageFilters;
                                            const next = checked
                                                ? [...current, item.id]
                                                : current.filter((id) => id !== item.id);
                                            dispatch(setFilter({ ageFilters: next as any }));
                                        }}
                                        className="border-muted-foreground/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                                    />
                                    <label
                                        htmlFor={item.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        {item.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
