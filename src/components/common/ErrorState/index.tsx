import { Box, Typography } from "@mui/material";
import type { ErrorStateProps } from "./index.types";
import text from "@/utils/text";

export default function ErrorState({ message = text.ERROR_IS_HAPPEN }: ErrorStateProps) {
    return (
        <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="h6" color="error">{message}</Typography>
        </Box>
    );
}