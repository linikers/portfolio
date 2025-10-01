import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Container } from '@mui/material';

const Blog = ({ post }: any) => {
        return (
            <Container>
            <h1>Blog</h1>
            <div className='container mx-auto py-8'>
                {post ? (
                    <div>
                    {/* <h2>{post.title}</ h2>
                    <p>{post.date}</p> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
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

            // console.log("result", matterResult);
            // console.log("conteudo", markdownContent);
    
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