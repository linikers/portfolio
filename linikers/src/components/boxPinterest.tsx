import { Box } from "@mui/material";
import { useEffect } from "react";

export default function BoxPin() {

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://assets.pinterest.com/js/pinit.js';
        document.body.appendChild(script);
    }, [])
    return (
        <Box>
            <a
            data-pin-do='embedBoard'
            data-pin-board-width="400"
            data-pin-scale-height="240"
            data-pin-scale-width="80"
            href="https://br.pinterest.com/liniker/arte/"
        >
            Pins
        </a>
        </Box>
    )
}