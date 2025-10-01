import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Box, Container } from '@mui/material';
import MenuUser from '@/components/menu';

const Blog = ({ post }: any) => {
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
                        {post ? (
                            <div>
                                <div className='max-w-2xl mx-auto text-center'>
                                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                                    <h1 className='text-gray-600 mb-2'>Data da publicação: {post.date}</h1>
                                    <div className='prose' dangerouslySetInnerHTML={{ __html: post.content }} />
                                </div>
                            </div>
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
            const matterResult = matter(markdownContent);
            
            const processedContent = await remark()
                .use(html)
                .process(matterResult.content);
            const contentHtml = processedContent.toString();


    
      const post = {
        title: matterResult.data.title || 'Sem título' || null,
        date: matterResult.data.date || null,
        content: contentHtml || null,
      };
    
      return { props: { post } };
    } catch (error) {
      console.error("Erro ao ler ou processar o arquivo markdown:", error);
      return { props: { post: null } };
    }
}
export default Blog;