import { useState } from "react";
import { Box } from "@mui/material";
import Loginform from "./Loginform";
import LoginBackImg from "./LoginBackImg";
import ForgotPasswordForm from "./ForgotPasswordForm";
import EmailSent from "./EmailSent"; // Assuming you have an EmailSent component

const LoginLayout = () => {
    const [mode, setMode] = useState("login");
    const onForgotPassword = () => {
        setMode("forgotPassword");
    }
    const onLogin = () => {
        setMode("login");
    }
    const onEmailSent = () => {
        setMode("emailSent");
    }
    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100%', padding: 5, alignContent: 'center', justifyContent: 'center', gap: 8 }}>
            <Box sx={{ flex: 1, display: 'flex', maxWidth: 500, justifyContent: 'end', alignItems: 'center' }}>
                {mode === "login" && <Loginform onForgotPassword={onForgotPassword} />}
                {mode === "forgotPassword" && <ForgotPasswordForm onLogin={onLogin} onEmailSent={onEmailSent} />}
                {mode === "emailSent" && <EmailSent onLogin={onLogin} />}
            </Box>
            <Box sx={{ flex: 1, width: "100%", maxWidth: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: '24px' }}>
                <LoginBackImg />
            </Box>

        </Box>
    );
};

export default LoginLayout;