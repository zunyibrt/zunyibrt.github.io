import NextLink from 'next/link'
import { Box, Container, Heading, Link, Divider, Text, HStack, Badge, VStack } from '@chakra-ui/react'
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


        {/* Blog posts from markdown */}
        {posts && posts.map((post, index) => (
          <Section key={post.slug} delay={0.1 + (index + 1) * 0.1}>
            <Box my={4} display="flex" alignItems="center">
              <Text fontSize="sm" color="gray.500" display="inline" mr={3} minWidth="100px">
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

      {/* <Section delay={0.2}>
        <Divider my={6} />
        <Heading as="h3" fontSize={20} mb={4}>
        Writing
        </Heading>
        <Box my={4}>
          <Link as={NextLink} href="">
            Ode to Nothing
          </Link>
        </Box>
        <Box my={4}>
          <Link as={NextLink} href="https://pine-diadem-ef5.notion.site/Diffusion-Models-8146aeecbee84981aaf6be246fb32243?pvs=4">
            Diffusion Models
          </Link>
        </Box>
      </Section> */}

      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

export default Writing
