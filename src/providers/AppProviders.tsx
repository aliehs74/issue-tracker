import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import router from "@/routes";
import theme from "@/theme";
import "react-toastify/dist/ReactToastify.css";

export default function AppProviders() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />

            <ToastContainer
                position="top-right"
                rtl
                newestOnTop
                autoClose={3000}
            />
        </ThemeProvider>
    );
}