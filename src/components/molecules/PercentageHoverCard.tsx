import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface PercentageHoverCardProps {
    title: string;
    value: number;
    description: string;
    warningThreshold?: number;
    children: React.ReactNode;
}

export const PercentageHoverCard = ({
    title,
    value,
    description,
    warningThreshold,
    children
}: PercentageHoverCardProps) => {
    const isWarning = warningThreshold !== undefined && value > warningThreshold;

    return (
        <HoverCard>
            <HoverCardTrigger asChild className="cursor-help">
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-60 bg-card border-border">
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{title}</h4>
                    <div className="text-2xl font-bold">
                        {value.toFixed(1)}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                    {isWarning && (
                        <div className="p-2 rounded bg-warning/10 text-warning text-xs font-medium mt-2 border border-warning/20">
                            Warning: High concentration detected (&gt; {warningThreshold}%)
                        </div>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
