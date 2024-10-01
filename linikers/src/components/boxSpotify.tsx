import { Box } from "@mui/material";

export default function BoxSpotify() {

    return (
        <Box>
            <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
                width='300'
                height='380'
                frameBorder='0'
                allow="encripted-media"
                style={{ borderRadius: '12px' }}
            >

            </iframe>
        </Box>
    )
}