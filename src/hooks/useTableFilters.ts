import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Token } from '@/types/token.types';

export const useTableFilters = (tokens: Token[]) => {
    const filters = useSelector((state: RootState) => state.filters);

    return useMemo(() => {
        return tokens.filter((token) => {
            // Price
            if (filters.priceRange.min !== null && token.price < filters.priceRange.min) return false;
            if (filters.priceRange.max !== null && token.price > filters.priceRange.max) return false;

            // Market Cap
            if (filters.marketCapRange.min !== null && token.marketCap < filters.marketCapRange.min) return false;
            if (filters.marketCapRange.max !== null && token.marketCap > filters.marketCapRange.max) return false;

            // Liquidity
            if (filters.liquidityRange.min !== null && token.liquidity < filters.liquidityRange.min) return false;
            if (filters.liquidityRange.max !== null && token.liquidity > filters.liquidityRange.max) return false;

            // Volume
            if (filters.volumeRange.min !== null && token.volume24h < filters.volumeRange.min) return false;
            if (filters.volumeRange.max !== null && token.volume24h > filters.volumeRange.max) return false;

            // Percentages
            if (filters.top10HoldersMax !== null && token.top10HoldersPercent > filters.top10HoldersMax) return false;
            if (filters.devHoldingMax !== null && token.devHoldingPercent > filters.devHoldingMax) return false;

            // Age
            if (filters.ageFilters.length > 0) {
                const ageHours = token.age / 60;
                const matchesAge = filters.ageFilters.some((filter) => {
                    if (filter === 'under1h') return ageHours < 1;
                    if (filter === '1to6h') return ageHours >= 1 && ageHours < 6;
                    if (filter === '6to24h') return ageHours >= 6 && ageHours < 24;
                    if (filter === 'over24h') return ageHours >= 24;
                    return false;
                });
                if (!matchesAge) return false;
            }

            return true;
        });
    }, [tokens, filters]);
};
