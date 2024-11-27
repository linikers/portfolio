import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function BoxPinterest() {

    useEffect(() => {

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://assets.pinterest.com/js/pinit.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <Box sx={{ padding: '20px' }} >
            <a
                data-pin-do="embedBoard"
                data-pin-board-width="480"
                data-pin-scale-height="340"
                data-pin-scale-width="80"
                href="https://www.pinterest.com/liniker/arte/">
            </a>
        </Box>
    );
}
