import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorState = ({ message = 'Something went wrong', onRetry }: ErrorBoundaryProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center p-4 border border-border rounded-md bg-card">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Error Loading Data</h3>
                <p className="text-muted-foreground max-w-md">{message}</p>
            </div>
            {onRetry && (
                <Button onClick={onRetry} variant="outline">
                    Try Again
                </Button>
            )}
        </div>
    );
};
