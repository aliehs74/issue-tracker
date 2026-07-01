import { Container } from "@mui/material";
import type { PageContainerProps } from "./index.types";

export default function PageContainer({ children }: PageContainerProps) {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {children}
        </Container>
    );
}