import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material";

export default function TableSkeleton() {
    return (
        <Table>
            <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                        {Array.from({ length: 7 }).map((_, i) => (<TableCell key={i} align="center"><Skeleton /></TableCell>))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}