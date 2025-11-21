import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FilterInputProps {
    label: string;
    min?: number | string;
    max?: number | string;
    onMinChange?: (value: string) => void;
    onMaxChange?: (value: string) => void;
    className?: string;
}

export const FilterInput = ({
    label,
    min,
    max,
    onMinChange,
    onMaxChange,
    className,
}: FilterInputProps) => {
    return (
        <div className={cn('space-y-2', className)}>
            <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
            <div className="flex items-center gap-2">
                <Input
                    type="number"
                    placeholder="Min"
                    value={min || ''}
                    onChange={(e) => onMinChange?.(e.target.value)}
                    className="h-8 text-xs"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                    type="number"
                    placeholder="Max"
                    value={max || ''}
                    onChange={(e) => onMaxChange?.(e.target.value)}
                    className="h-8 text-xs"
                />
            </div>
        </div>
    );
};
