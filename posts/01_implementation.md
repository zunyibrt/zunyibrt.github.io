---
title: "Blog Implementation Summary"
date: "2025-07-07"
excerpt: "Complete guide to implementing a markdown blog with Next.js, Chakra UI, and mathematical equations"
tags: ["nextjs", "react-markdown", "chakra-ui", "katex", "blog"]
---

This document summarizes the complete implementation of a markdown-based blog system using Next.js, Chakra UI, react-markdown, and KaTeX for mathematical equations.

## Tech Stack

- **Next.js** - React framework with static site generation
- **Chakra UI** - Component library for styling
- **react-markdown** - Markdown to React component converter
- **KaTeX** - LaTeX equation rendering
- **gray-matter** - Frontmatter parsing
- **Framer Motion** - Animations

## Required Dependencies

```bash
npm install react-markdown remark-gfm rehype-highlight rehype-raw gray-matter katex rehype-katex remark-math
```

## File Structure

```
project/
├── components/
│   └── BlogPost.jsx
├── lib/
│   └── posts.js
├── pages/
│   ├── writing.js (blog index)
│   └── blog/
│       └── [slug].js (individual posts)
├── posts/
│   ├── my-first-post.md
│   └── second-blog-post.md
└── pages/_app.js
```

## Core Components

### lib/posts.js - File System Functions
```javascript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data,
  };
}
```

### components/BlogPost.jsx - Markdown Renderer
```javascript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import { 
  Box, 
  Heading, 
  Text, 
  Code, 
  Divider, 
  Link,
  UnorderedList,
  OrderedList,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react';

const BlogPost = ({ content }) => {
  const blockquoteBg = useColorModeValue('gray.50', 'gray.700');
  const inlineCodeBg = useColorModeValue('gray.100', 'gray.600');
  const inlineCodeColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box maxW="800px" mx="auto" p={6}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <Heading as="h1" size="2xl" mb={6} mt={8}>
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading as="h2" size="xl" mb={4} mt={6}>
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading as="h3" size="lg" mb={3} mt={5}>
              {children}
            </Heading>
          ),
          p: ({ children }) => (
            <Text mb={4} lineHeight="1.7">
              {children}
            </Text>
          ),
          ul: ({ children }) => (
            <UnorderedList mb={4} spacing={2}>
              {children}
            </UnorderedList>
          ),
          ol: ({ children }) => (
            <OrderedList mb={4} spacing={2}>
              {children}
            </OrderedList>
          ),
          li: ({ children }) => (
            <ListItem>{children}</ListItem>
          ),
          code: ({ inline, children, className }) => {
            return inline ? (
              <Code 
                px={2} 
                py={1} 
                bg={inlineCodeBg}
                color={inlineCodeColor}
                borderRadius="md"
                suppressHydrationWarning={true}
              >
                {children}
              </Code>
            ) : (
              <Box mb={4}>
                <Code
                  as="pre"
                  display="block"
                  p={4}
                  bg="gray.900"
                  color="white"
                  _dark={{ bg: "gray.800" }}
                  borderRadius="md"
                  overflow="auto"
                  suppressHydrationWarning={true}
                >
                  {children}
                </Code>
              </Box>
            );
          },
          a: ({ href, children }) => (
            <Link href={href} color="blue.500" isExternal>
              {children}
            </Link>
          ),
          blockquote: ({ children }) => (
            <Box
              as="blockquote"
              borderLeft="4px solid"
              borderColor="blue.500"
              pl={4}
              py={2}
              mb={4}
              fontStyle="italic"
              bg={blockquoteBg}
              _dark={{ bg: "gray.700", borderColor: "blue.300" }}
              borderRadius="md"
              suppressHydrationWarning={true}
            >
              {children}
            </Box>
          ),
          hr: () => <Divider my={6} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default BlogPost;
```

### pages/writing.js - Blog Index
```javascript
import NextLink from 'next/link'
import { Box, Container, Heading, Link, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { getAllPosts } from '../lib/posts'

const Writing = ({ posts = [] }) => {
  return (
    <Layout title="Posts">
      <Container>
        <Heading as="h3" fontSize={20} mb={4} mt={5}>
          Posts
        </Heading>

        {posts && posts.map((post, index) => (
          <Section key={post.slug} delay={0.1 + (index + 1) * 0.1}>
            <Box my={4}>
              <Text fontSize="sm" color="gray.500" display="inline" mr={3}>
                {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC'
                })}
              </Text>
              <Link as={NextLink} href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </Box>
          </Section>
        ))}

      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const posts = getAllPosts();
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default Writing
```

### pages/blog/[slug].js - Individual Post Pages
```javascript
import { getAllPosts, getPostBySlug } from '../../lib/posts';
import BlogPost from '../../components/BlogPost';
import { Box, Heading, Text } from '@chakra-ui/react';

export default function Post({ post }) {
  return (
    <Box>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="3xl" mb={4}>
          {post.title}
        </Heading>
        <Text color="gray.600">{post.date}</Text>
      </Box>
      <BlogPost content={post.content} />
    </Box>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
```

## Markdown Features Supported

### Basic Formatting
- **Bold text** and *italic text*
- Headers (H1, H2, H3)
- Paragraphs with proper spacing
- Horizontal rules
- Links (internal and external)

### Lists
- Unordered lists with bullet points
- Ordered lists with numbers
- Proper spacing between items

### Code
- Multi-line code blocks with language-specific highlighting
- Dark/light mode responsive styling

### Blockquotes
> Styled blockquotes with left border. Dark/light mode responsive

### Mathematical Equations
- Inline math: $E = mc^2$
- Block equations: $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
- Complex expressions with proper LaTeX rendering

## Frontmatter Structure
```yaml
---
title: "Post Title"
date: "2025-01-15"
excerpt: "Brief description of the post"
tags: ["tag1", "tag2", "tag3"]
---
```

## Development Workflow

1. Create markdown files in posts/ directory
2. Posts automatically appear on /writing page

## Troubleshooting Notes

- **Date Issues**: Use `new Date(post.date + 'T00:00:00')` to prevent timezone shifts
- Inline equations not working