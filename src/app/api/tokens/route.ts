import { NextResponse } from 'next/server';
import { MOCK_TOKENS } from '@/services/mockData';
import { TokenCategory } from '@/types/token.types';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as TokenCategory | null;

    if (category && MOCK_TOKENS[category]) {
        return NextResponse.json(MOCK_TOKENS[category]);
    }

    // Return all tokens if no category specified
    const allTokens = [
        ...MOCK_TOKENS.new,
        ...MOCK_TOKENS.final,
        ...MOCK_TOKENS.migrated,
    ];

    return NextResponse.json(allTokens);
}
