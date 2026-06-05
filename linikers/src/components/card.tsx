import { Button, Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Link from "next/link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface iCardPortfilioProps {
  imgUrl: string;
  altText: string;
  title: string;
  subTitle: string;
  description: string;
  url: string;
}

export default function CardPortfolio({
  imgUrl,
  altText,
  title,
  subTitle,
  description,
  url,
}: iCardPortfilioProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.25s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          borderColor: "primary.main",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imgUrl}
        alt={altText}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontFamily: "monospace",
            fontSize: "1rem",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {subTitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {description}
        </Typography>
        <Box sx={{ mt: "auto", pt: 1 }}>
          <Link href={url} target="_blank" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="small"
              endIcon={<OpenInNewIcon fontSize="small" />}
              fullWidth
              sx={{
                fontFamily: "monospace",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
            >
              Acessar
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
