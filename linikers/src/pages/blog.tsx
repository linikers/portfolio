import { Container, Typography, Box } from "@mui/material";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default function Blog({ posts }: any) {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "monospace",
          fontWeight: 900,
          mb: 1,
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        blog/
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85rem", mb: 6 }}
      >
        $ cat ~/posts/*.md
      </Typography>

      {posts && posts.length > 0 ? (
        posts.map((post: any, index: number) => (
          <Box
            key={index}
            sx={{
              mb: 8,
              p: 3,
              borderRadius: 2,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: "monospace", fontWeight: 700, mb: 1 }}
            >
              {post.title}
            </Typography>
            {post.date && (
              <Typography
                variant="caption"
                sx={{ color: "primary.main", fontFamily: "monospace", mb: 3, display: "block" }}
              >
                ▸ {post.date}
              </Typography>
            )}
            <Box
              className="prose"
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: "0.9rem",
                "& h1, & h2, & h3": { fontFamily: "monospace", color: "primary.main" },
                "& p": { mb: 2 },
                "& code": { fontFamily: "monospace", bgcolor: "rgba(255,255,255,0.05)", px: 0.8, py: 0.3, borderRadius: 1 },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Box>
        ))
      ) : (
        <Typography sx={{ color: "text.secondary", fontFamily: "monospace" }}>
          $ echo &apos;Nenhum post publicado ainda&apos;
        </Typography>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  try {
    const markdownFilePath = path.join(process.cwd(), "iniBlog.md");
    const markdownContent = fs.readFileSync(markdownFilePath, "utf-8");
    const postStrings = markdownContent
      .split("---_POST_SEPARATOR_---")
      .filter((post) => post.trim() !== "");

    const posts = [];
    for (const postString of postStrings) {
      const fullPostContent = `---\n${postString.trim()}`;
      const matterResult = matter(fullPostContent);
      const processedContent = await remark().use(html).process(matterResult.content);
      posts.push({
        title: matterResult.data.title || "Sem titulo",
        date: matterResult.data.date || null,
        content: processedContent.toString(),
      });
    }
    return { props: { posts } };
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return { props: { posts: [] } };
  }
}
