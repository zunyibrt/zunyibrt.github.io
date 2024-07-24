import NextLink from 'next/link'
import { Box, Container, Heading, Link, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'


const Writing = () => (
  <Layout title="Posts">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Posts
      </Heading>


      <Section delay={0.1}>
        <Box my={4}>
        <Link as={NextLink} href="https://pine-diadem-ef5.notion.site/Diffusion-Models-8146aeecbee84981aaf6be246fb32243?pvs=4">
          Resources on Diffusion Models
        </Link>
        </Box>
      </Section>
        
      <Section delay={0.2}>
        <Divider my={6} />
        <Heading as="h3" fontSize={20} mb={4}>
        Writing
        </Heading>
        <Box my={4}>
        <Link as={NextLink} href="">
          Ode to Nothing
        </Link>
        </Box>
      </Section>
    </Container>
  </Layout>
)

export default Writing
// export { getServerSideProps } from '../components/chakra'