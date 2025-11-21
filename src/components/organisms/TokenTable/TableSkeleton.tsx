import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const TableSkeleton = () => {
    return (
        <div className="rounded-md border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: 14 }).map((_, i) => (
                            <TableHead key={i}>
                                <Skeleton className="h-4 w-16" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="h-3 w-12" />
                                        <Skeleton className="h-2 w-20" />
                                    </div>
                                </div>
                            </TableCell>
                            {Array.from({ length: 13 }).map((_, j) => (
                                <TableCell key={j}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
