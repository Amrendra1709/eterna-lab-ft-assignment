import { Token, TokenCategory } from '@/types/token.types';

const TOKEN_NAMES = [
    'Pepe', 'Doge', 'Shiba', 'Floki', 'Bonk', 'Wif', 'Trump', 'Biden', 'Elon', 'Moon',
    'Rocket', 'Safe', 'Baby', 'Cat', 'Inu', 'Coin', 'Swap', 'DeFi', 'AI', 'GPT'
];

const TOKEN_SUFFIXES = [
    'Inu', 'Coin', 'Swap', 'Protocol', 'Finance', 'AI', 'GPT', 'Verse', 'Moon', 'Mars'
];

const generateRandomToken = (id: string, category: TokenCategory): Token => {
    const name = `${TOKEN_NAMES[Math.floor(Math.random() * TOKEN_NAMES.length)]} ${TOKEN_SUFFIXES[Math.floor(Math.random() * TOKEN_SUFFIXES.length)]}`;
    const ticker = name.split(' ').map(w => w[0].toUpperCase()).join('') + Math.floor(Math.random() * 100);

    const now = new Date();
    const ageMinutes = Math.floor(Math.random() * 60 * 24); // Up to 24 hours
    const createdAt = new Date(now.getTime() - ageMinutes * 60 * 1000);

    const price = Math.random() * 0.0001;
    const priceChange24h = (Math.random() * 200) - 50; // -50% to +150%

    return {
        id,
        name,
        ticker,
        logoUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`,
        age: ageMinutes,
        price,
        priceChange24h,
        marketCap: price * 1000000000, // Mock supply 1B
        liquidity: Math.random() * 500000,
        volume24h: Math.random() * 1000000,
        holders: Math.floor(Math.random() * 5000),
        top10HoldersPercent: Math.random() * 80,
        devHoldingPercent: Math.random() * 30,
        snipersPercent: Math.random() * 40,
        insidersPercent: Math.random() * 50,
        buyCount: Math.floor(Math.random() * 1000),
        sellCount: Math.floor(Math.random() * 800),
        category,
        bondingCurveProgress: category === 'final' ? 80 + Math.random() * 20 : undefined,
        raydiumPoolAddress: category === 'migrated' ? 'RaydiumPoolAddress...' : undefined,
        createdAt,
        lastUpdated: now,
    };
};

export const generateMockTokens = (count: number, category: TokenCategory): Token[] => {
    return Array.from({ length: count }, (_, i) =>
        generateRandomToken(`${category}-${i}`, category)
    );
};

export const MOCK_TOKENS = {
    new: generateMockTokens(40, 'new'),
    final: generateMockTokens(30, 'final'),
    migrated: generateMockTokens(30, 'migrated'),
};
