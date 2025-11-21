import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Token } from '@/types/token.types';
import { useMemo } from 'react';
import { subMinutes, format } from 'date-fns';

interface TokenChartProps {
    token: Token;
}

export const TokenChart = ({ token }: TokenChartProps) => {
    const data = useMemo(() => {
        const points = [];
        const now = new Date();
        let currentPrice = token.price;

        // Generate 60 points for the last hour
        for (let i = 60; i >= 0; i--) {
            const time = subMinutes(now, i);
            // Random walk for price
            const change = (Math.random() - 0.5) * (currentPrice * 0.02);
            currentPrice += change;

            points.push({
                time: time.getTime(),
                price: Math.max(0.00000001, currentPrice), // Ensure price stays positive
                formattedTime: format(time, 'HH:mm'),
            });
        }
        // Ensure the last point matches current price
        points[points.length - 1].price = token.price;

        return points;
    }, [token.price]);

    const isPositive = token.priceChange24h >= 0;
    const color = isPositive ? '#10B981' : '#EF4444'; // success or error color

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                        dataKey="formattedTime"
                        stroke="#666"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        minTickGap={30}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        stroke="#666"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toFixed(6)}`}
                        width={80}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#999' }}
                        formatter={(value: number) => [`$${value.toFixed(8)}`, 'Price']}
                    />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
