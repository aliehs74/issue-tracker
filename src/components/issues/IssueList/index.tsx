import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import { useNavigate } from 'react-router-dom';
import { StatusChip } from '@/components/common/StatusChip';
import { PriorityChip } from '@/components/common/priorityChip';
import { formatDate, isOverdue } from '@/utils/dateUtils';
import { text } from '@/utils/text';
import { toPersianDigits } from '@/utils/jalali';
import type { IssueListProps } from '@/components/issues/IssueList/index.types';

const columns = [text.COLUMN_ID, text.COLUMN_TITLE, text.COLUMN_STATUS, text.COLUMN_PRIORITY, text.COLUMN_ASSIGNEE, text.COLUMN_DUE_DATE, text.COLUMN_CREATED_AT, text.COLUMN_ACTIONS,];

export function IssueList({ issues, onDeleteRequest }: IssueListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const renderActions = (issue: any, withTooltip = false) => {
    const actions = (
      <>
        <IconButton size="small" onClick={() => navigate(`/issues/${issue.id}/edit`)} aria-label={text.EDIT}> <EditOutlinedIcon fontSize="small" /> </IconButton>
        <IconButton size="small" color="error" onClick={() => onDeleteRequest(issue)} aria-label={text.DELETE}> <DeleteOutlineIcon fontSize="small" /> </IconButton>
      </>
    );

    if (!withTooltip) return actions;

    return (
      <>
        <Tooltip title={text.EDIT}>{actions.props.children[0]}</Tooltip>
        <Tooltip title={text.DELETE}>{actions.props.children[1]}</Tooltip>
      </>
    );
  };

  const renderDueDate = (issue: any) => {
    const overdue = isOverdue(issue.dueDate, issue.status);

    return (
      <Stack direction="row" spacing={0.5} alignItems="center" color={overdue ? 'error.main' : 'text.secondary'}>
        <EventOutlinedIcon fontSize="small" color={overdue ? 'error' : 'disabled'} />
        <Typography variant="body2" color={overdue ? 'error' : 'text.secondary'}> {formatDate(issue.dueDate)} </Typography>
      </Stack>
    );
  };

  if (isMobile) {
    return (
      <Stack spacing={1.5}>
        {issues.map((issue) => (
          <Card key={issue.id} variant="outlined">
            <CardActionArea onClick={() => navigate(`/issues/${issue.id}`)}>
              <CardContent>

                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={700} noWrap>{issue.title}</Typography>
                    <Typography variant="caption" color="text.secondary">#{toPersianDigits(issue.id)}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <StatusChip status={issue.status} />
                    <PriorityChip priority={issue.priority} />
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">{issue.assignee}</Typography>
                    {renderDueDate(issue)}
                  </Stack>
                </Stack>

              </CardContent>
            </CardActionArea>

            <Stack direction="row" justifyContent="flex-end" sx={{ px: 1, pb: 1 }}> {renderActions(issue)} </Stack>
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
          {issues.map((issue) => (
            <TableRow key={issue.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/issues/${issue.id}`)}>
              <TableCell align="center"> <Typography variant="body2" color="text.secondary">{toPersianDigits(issue.id)}</Typography>   </TableCell>
              <TableCell align="center" sx={{ maxWidth: 280 }}>   <Typography variant="body2" fontWeight={600} noWrap>{issue.title}</Typography> </TableCell>
              <TableCell align="center"> <StatusChip status={issue.status} /> </TableCell>
              <TableCell align="center"> <PriorityChip priority={issue.priority} /> </TableCell>
              <TableCell align="center"> {issue.assignee} </TableCell>
              <TableCell align="center"> <Box display="flex" justifyContent="center"> {renderDueDate(issue)} </Box>  </TableCell>
              <TableCell align="center">{formatDate(issue.createdAt)}</TableCell>
              <TableCell align="center" onClick={(e) => e.stopPropagation()}> {renderActions(issue, true)} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}