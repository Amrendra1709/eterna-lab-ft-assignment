import { Token, TokenCategory } from '@/types/token.types';

const API_BASE = '/api/tokens';

export const tokenService = {
    getTokens: async (category?: TokenCategory): Promise<Token[]> => {
        const url = category ? `${API_BASE}?category=${category}` : API_BASE;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch tokens');
        }
        return response.json();
    },
};
