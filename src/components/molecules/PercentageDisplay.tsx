import { cn } from '@/lib/utils';

interface PercentageDisplayProps {
    value: number;
    className?: string;
    showPlus?: boolean;
    warningThreshold?: number;
}

export const PercentageDisplay = ({
    value,
    className,
    showPlus = true,
    warningThreshold,
}: PercentageDisplayProps) => {
    const isPositive = value > 0;
    const isWarning = warningThreshold !== undefined && value > warningThreshold;

    return (
        <div
            className={cn(
                'font-medium',
                isWarning ? 'text-warning' : isPositive ? 'text-success' : 'text-danger',
                className
            )}
        >
            {showPlus && isPositive && '+'}
            {value.toFixed(2)}%
        </div>
    );
};
