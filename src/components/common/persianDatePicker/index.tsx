import { useMemo, useState, type MouseEvent } from 'react';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { formatJalaliDate, isoToJalali, jalaliMonthLength, jalaliToIso, JALALI_MONTH_NAMES, JALALI_WEEKDAY_NAMES, toPersianDigits, todayJalali, type JalaliDate, } from '@/utils/jalali';
import { text } from '@/utils/text';
import type { PersianDatePickerProps } from '@/components/common/persianDatePicker/index.types';
export type { JalaliDate };

function startWeekdayIndex(jy: number, jm: number): number {
  const iso = jalaliToIso(jy, jm, 1);
  const date = new Date(iso);
  const isoWeekday = date.getUTCDay();
  return (isoWeekday + 1) % 7;
}

export function PersianDatePicker({ value, onChange, label, error = false, helperText, required = false, disabled = false }: PersianDatePickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const selected = useMemo(() => isoToJalali(value), [value]);
  const [viewYear, setViewYear] = useState(() => (selected ?? todayJalali()).jy);
  const [viewMonth, setViewMonth] = useState(() => (selected ?? todayJalali()).jm);

  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    const base = selected ?? todayJalali();
    setViewYear(base.jy);
    setViewMonth(base.jm);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const daysInMonth = jalaliMonthLength(viewYear, viewMonth);
  const leadingBlanks = startWeekdayIndex(viewYear, viewMonth);

  const goPrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handlePick = (day: number) => {
    onChange(jalaliToIso(viewYear, viewMonth, day));
    handleClose();
  };

  const handleToday = () => {
    const today = todayJalali();
    onChange(jalaliToIso(today.jy, today.jm, today.jd));
    handleClose();
  };

  const isSelectedDay = (day: number): boolean => {
    return Boolean(
      selected &&
      selected.jy === viewYear &&
      selected.jm === viewMonth &&
      selected.jd === day
    );
  };

  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <>
      <TextField
        label={label}
        value={formatJalaliDate(selected)}
        onClick={disabled ? undefined : handleOpen}
        required={required}
        error={error}
        helperText={helperText}
        disabled={disabled}
        fullWidth
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          },
        }}
        sx={{ cursor: disabled ? 'default' : 'pointer' }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
            <IconButton size="small" onClick={goNextMonth} aria-label={text.DATE_PICKER_NEXT_MONTH}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="subtitle2" fontWeight={700}>
              {JALALI_MONTH_NAMES[viewMonth - 1]} {toPersianDigits(viewYear)}
            </Typography>
            <IconButton size="small" onClick={goPrevMonth} aria-label={text.DATE_PICKER_PREV_MONTH}>
              <ChevronRightIcon />
            </IconButton>
          </Stack>

          <Box
            sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 0.5 }}>
            {JALALI_WEEKDAY_NAMES.map((weekday) => (
              <Typography key={weekday} variant="caption" color="text.secondary" textAlign="center" fontWeight={600}>
                {weekday}
              </Typography>
            ))}
          </Box>

          <Box
            sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
            {cells.map((day, index) =>
              day === null ? (
                <Box key={`blank-${index}`} />
              ) : (
                <Button key={day} size="small" onClick={() => handlePick(day)} variant={isSelectedDay(day) ? 'contained' : 'text'} color="primary" sx={{ minWidth: 0, height: 32, borderRadius: '50%', p: 0, }} >
                  {toPersianDigits(day)}
                </Button>
              )
            )}
          </Box>

          <Stack direction="row" justifyContent="center" mt={1.5}>
            <Button size="small" onClick={handleToday}>
              {text.DATE_PICKER_TODAY}
            </Button>
          </Stack>
        </Box>
      </Popover >
    </>
  );
}

