import { Box } from "@mui/material";

export default function BoxGitDefault() {

    return (
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px 0',
            padding: '20px',
            backgroundColor: '#2e3440',
            borderRadius: '8px',
          }}
        >
          <a href="https://github.com/linikers/github-readme-stats">
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=linikers&langs_count=8&layout=compact&theme=merko"
            alt="Top Langs"
            style={{ width: "100%", maxWidth: "400px", marginBottom: "10px" }}
          />
        </a>
        <img
          src="https://github-readme-stats.vercel.app/api?username=linikers&show_icons=true&theme=merko"
          alt="Liniker's GitHub stats"
          style={{ width: "100%", maxWidth: "400px" }}
        />
        </Box>
    )
} 