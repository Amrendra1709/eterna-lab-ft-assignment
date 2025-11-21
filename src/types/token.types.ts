export type TokenCategory = 'new' | 'final' | 'migrated';

export interface Token {
  id: string;
  name: string;
  ticker: string;
  logoUrl: string;
  age: number; // in minutes
  price: number;
  priceChange24h: number; // percentage
  marketCap: number;
  liquidity: number;
  volume24h: number;
  holders: number;
  top10HoldersPercent: number;
  devHoldingPercent: number;
  snipersPercent: number;
  insidersPercent: number;
  buyCount: number;
  sellCount: number;
  category: TokenCategory;
  bondingCurveProgress?: number; // 0-100, only for 'final'
  raydiumPoolAddress?: string; // only for 'migrated'
  createdAt: Date;
  lastUpdated: Date;
}

export interface SortConfig {
  column: keyof Token | null;
  direction: 'asc' | 'desc' | null;
}

export interface FilterConfig {
  priceRange: { min: number | null; max: number | null };
  marketCapRange: { min: number | null; max: number | null };
  liquidityRange: { min: number | null; max: number | null };
  volumeRange: { min: number | null; max: number | null };
  top10HoldersMax: number | null;
  devHoldingMax: number | null;
  ageFilters: ('under1h' | '1to6h' | '6to24h' | 'over24h')[];
  minHolders: number | null;
}
