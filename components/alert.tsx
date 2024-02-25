import React from "react";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";

const AlertComponent = ({ title, message, color }: { title: string, message:string, color:string }) => {
    return (
        <Alert variant="filled" severity={color as AlertColor}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    );
};

export default AlertComponent;