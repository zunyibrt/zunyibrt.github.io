// components/BlogPost.jsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
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
import dynamic from 'next/dynamic'
import Loader from './voxel-loader'

const VoxelArt = dynamic(() => import('./voxel-model'), {
    ssr: false,
    loading: () => <Loader />
})

const BlogPost = ({ content }) => {
  
  return (
    <Box maxW="800px" mx="auto" p={6}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
        components={{
          // Headers
          h1: ({ children }) => (
            <Heading as="h1" size="2xl" mb={6} mt={8} fontFamily="Arial">
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading as="h2" size="xl" mb={4} mt={6} fontFamily="Arial">
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading as="h3" size="lg" mb={3} mt={5} fontFamily="Arial">
              {children}
            </Heading>
          ),
          
          // Paragraphs
          p: ({ children }) => (
            <Text mb={4} lineHeight="1.7">
              {children}
            </Text>
          ),
          
          // Lists
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
          
          // Code
          code: ({ node, inline, className, children, ...props }) => {
            // Fallback detection if inline is undefined
            const isInline = inline ?? !className?.includes('language-');
            if (isInline) {
              return (
                <Code
                  px={2}
                  py={0.95}
                  bg="gray.900"
                  color="white"
                  borderRadius="md"
                >
                  {children}
                </Code>
              );
            } else {
              return (
                <Code
                  display="block"
                  p={4}
                  bg="gray.900"
                  color="white"
                  borderRadius="md"
                  overflow="auto"
                  mb={4}
                >
                  {children}
                </Code>
              );
            }
          },
          
          // Links
          a: ({ href, children }) => (
            <Link href={href} isExternal>
              {children}
            </Link>
          ),
          
          // Blockquotes
          blockquote: ({ children }) => (
            <Box
              as="blockquote"
              borderLeft="4px solid"
              borderColor={useColorModeValue('blue.500', 'blue.300')}
              pl={4}
              py={2}
              mb={4}
              fontStyle="italic"
              bg={useColorModeValue('gray.50', 'gray.700')}
              borderRadius="md"
            >
              {children}
            </Box>
          ),
          
          // Horizontal rule
          hr: () => <Divider my={6} />,

          // Voxel Art
          'voxel-art': ({ width, height }) => (
            <VoxelArt width={width || '100%'} height={height || '400px'} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default BlogPost;