import { Box } from "@mui/material";
import Image from "next/image";
// import userIcon from "https://github-readme-stats.vercel.app/api?username=linikers&show_icons=true&theme=merko";
// import langIcon from "https://github-readme-stats.vercel.app/api/top-langs/?username=linikers&langs_count=8&layout=compact&theme=merko";

export default function BoxGitDefault() {
    const userIcon = "https://github-readme-stats.vercel.app/api?username=linikers&show_icons=true&theme=merko";
    const langIcon = "https://github-readme-stats.vercel.app/api/top-langs/?username=linikers&langs_count=8&layout=compact&theme=merko";
  

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
            <Image 
                src={langIcon}
                alt="Top langs"
                width={400}
                height={200}
                style={{ marginBottom: "10px" }}
            />
          {/* <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=linikers&langs_count=8&layout=compact&theme=merko"
            alt="Top Langs"
            style={{ width: "100%", maxWidth: "400px", marginBottom: "10px" }}
          /> */}
        </a>
        <Image 
            src={userIcon}
            alt="Liniker's GitHub stats"
            width={400}
            height={200}
            style={{ width: "100%" }}
        />
        {/* <img
          src="https://github-readme-stats.vercel.app/api?username=linikers&show_icons=true&theme=merko"
          alt="Liniker's GitHub stats"
          style={{ width: "100%", maxWidth: "400px" }}
        /> */}
        </Box>
    )
} 