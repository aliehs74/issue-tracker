import { Box, Typography } from "@mui/material";
import type { EmptyStateProps } from "./index.types";
import text from "@/utils/text";

export default function EmptyState({ message = text.ITEM_NOT_FOUND }: EmptyStateProps) {
    return (
        <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="h6">{message}</Typography>
        </Box>
    );
}