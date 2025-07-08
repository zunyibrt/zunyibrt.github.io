import { getAllPosts, getPostBySlug } from '../../lib/posts';
import BlogPost from '../../components/BlogPost';
import { Box, Heading, Text, Divider, useColorModeValue } from '@chakra-ui/react';

export default function Post({ post }) {
  return (
    <Box>
      <Box textAlign="center" mb={1}>
        <Heading as="h1" size="2xl" mb={4} mt={5} fontFamily="Arial">
          {post.title}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.500')}>
          {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC'
                })}
        </Text>
      <Divider my={4} borderColor={useColorModeValue('gray.500', 'gray.600')}/>
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