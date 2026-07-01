import { Box, Typography } from "@mui/material";
import type { PageHeaderProps } from "./index.types";

export default function PageHeader({ title }: PageHeaderProps) {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{title}</Typography>
        </Box>
    );
}