type WebSocketListener = (message: any) => void;

class MockWebSocketService {
    private listeners: WebSocketListener[] = [];
    private intervalId: NodeJS.Timeout | null = null;
    private isConnected: boolean = false;

    connect() {
        if (this.isConnected) return;
        this.isConnected = true;
        console.log('Mock WebSocket connected');
        this.startEmitting();
    }

    disconnect() {
        this.isConnected = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        console.log('Mock WebSocket disconnected');
    }

    subscribe(listener: WebSocketListener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private startEmitting() {
        this.intervalId = setInterval(() => {
            if (!this.isConnected) return;

            const random = Math.random();
            if (random < 0.7) {
                this.emitPriceUpdate();
            } else {
                this.emitNewToken();
            }
        }, 2000); // Update every 2 seconds
    }

    private emitPriceUpdate() {
        // Simulate price updates for random tokens across categories
        // In a real app, we'd probably need to know which tokens are visible or subscribed to
        // For this mock, we'll generate updates for random IDs that might match our mock data

        const categories = ['new', 'final', 'migrated'];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const count = Math.floor(Math.random() * 3) + 1;

        const updates = Array.from({ length: count }, () => ({
            id: `${category}-${Math.floor(Math.random() * 30)}`, // Target existing mock IDs
            price: Math.random() * 0.0001,
            priceChange24h: (Math.random() * 200) - 50,
            category // Include category to help reducer find it easily
        }));

        this.notifyListeners({
            type: 'PRICE_UPDATE',
            payload: updates,
            timestamp: Date.now(),
        });
    }

    private emitNewToken() {
        // Simulate a new token appearing in the 'new' category
        const uniqueId = `new-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        const sanitizedSeed = uniqueId.replace(/[^a-zA-Z0-9]/g, '');

        this.notifyListeners({
            type: 'NEW_TOKEN',
            payload: {
                id: uniqueId,
                name: `New Token ${Math.floor(Math.random() * 1000)}`,
                ticker: `NEW${Math.floor(Math.random() * 100)}`,
                logoUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${sanitizedSeed}`,
                age: 0,
                price: Math.random() * 0.00001,
                priceChange24h: 0,
                marketCap: 10000,
                liquidity: 5000,
                volume24h: 0,
                holders: 1,
                top10HoldersPercent: 100,
                devHoldingPercent: 100,
                snipersPercent: 0,
                insidersPercent: 0,
                buyCount: 0,
                sellCount: 0,
                category: 'new',
                createdAt: new Date(),
                lastUpdated: new Date(),
            },
            timestamp: Date.now(),
        });
    }

    private notifyListeners(message: any) {
        this.listeners.forEach((listener) => listener(message));
    }
}

export const mockWebSocketService = new MockWebSocketService();
