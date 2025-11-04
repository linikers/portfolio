import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Box, Container } from '@mui/material';
import MenuUser from '@/components/menu';

const Blog = ({ posts }: any) => {
        return (
            <Container>
                <Box sx={{
                    position: "absolute",
                    zIndex: 10,
                    display: "flex",
                    margin: 6,
                }}>
                    <MenuUser/>
                </Box>

                <Box>
                    <div className='container mx-auto py-8'>

                        {posts && posts.length > 0 ? (
                            posts.map((post: any, index: number) => (
                                <div key={index} className="mb-16">
                                    <div className='max-w-2xl mx-auto text-center'>
                                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                                        <h1 className='text-gray-600 mb-2 font-bold'>Data da publicação: {post.date}</h1>
                                        <div className='prose' dangerouslySetInnerHTML={{ __html: post.content }} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-gray-500'>Não há postagens publicadas.</p>
                        )}
                    </div>
                </Box>
            </Container>
        );
};
    
export async function getStaticProps() {
        try {
            const markdownFilePath = path.join(process.cwd(), 'iniBlog.md');
            const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');
    
            // Divide o conteúdo pelo separador '---' para isolar as seções de frontmatter e conteúdo
            const sections = markdownContent.split('---').filter(section => section.trim() !== '');
    
            const posts = [];
            // Cada post é composto por uma seção de frontmatter e uma de conteúdo
            for (let i = 0; i < sections.length; i += 2) {
                if (sections[i] && sections[i + 1]) {
                    const frontmatter = sections[i];
                    const content = sections[i + 1];
                    const matterResult = matter(`---\n${frontmatter}\n---\n${content}`);
    
                    const processedContent = await remark().use(html).process(matterResult.content);
                    const contentHtml = processedContent.toString();
    
                    posts.push({
                        title: matterResult.data.title || 'Sem título',
                        date: matterResult.data.date || null,
                        content: contentHtml,
                    });
                }
            }
            return { props: { posts } };
    } catch (error) {
        console.error("Erro ao ler ou processar o arquivo markdown:", error);
        return { props: { posts: [] } };
    }
}
export default Blog;