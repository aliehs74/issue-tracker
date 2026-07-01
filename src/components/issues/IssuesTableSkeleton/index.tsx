import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { text } from '@/utils/text';
import type { IssuesTableSkeletonProps } from '@/components/issues/IssuesTableSkeleton/index.types';

const columns = [text.COLUMN_ID, text.COLUMN_TITLE, text.COLUMN_STATUS, text.COLUMN_PRIORITY, text.COLUMN_ASSIGNEE, text.COLUMN_DUE_DATE, text.COLUMN_CREATED_AT, text.COLUMN_ACTIONS,];
const skeletonCells = [{ variant: 'text', width: 32 }, { variant: 'text', width: '80%' }, { variant: 'rounded', width: 72, height: 24 }, { variant: 'rounded', width: 64, height: 24 }, { variant: 'text', width: 60 }, { variant: 'text', width: 90 }, { variant: 'text', width: 90 }, { variant: 'circular', width: 28, height: 28 },] as const;

export function IssuesTableSkeleton({ rowCount = 10 }: IssuesTableSkeletonProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Stack spacing={1.5}>
        {Array.from({ length: rowCount }).map((_, index) => (
          <Card key={index} variant="outlined">
            <CardContent>

              <Stack spacing={1}>
                <Skeleton variant="text" width="70%" height={28} />
                <Stack direction="row" spacing={1}> {[64, 64].map((width) => (<Skeleton key={width} variant="rounded" width={width} height={24} />))} </Stack>
                <Stack direction="row" justifyContent="space-between"> {['30%', '30%'].map((width) => (<Skeleton key={width} variant="text" width={width} />))} </Stack>
              </Stack>

            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>

        <TableHead>
          <TableRow> {columns.map((column) => (<TableCell key={column} align="center">{column}</TableCell>))} </TableRow>
        </TableHead>

        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {skeletonCells.map((cell, cellIndex) => (<TableCell key={cellIndex} align="center"> <Skeleton {...cell} sx={{ mx: 'auto' }} /> </TableCell>))}
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}