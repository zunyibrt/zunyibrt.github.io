import NextLink from 'next/link'
import { Box, Container, Heading, Link } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

const Papers = () => (
<Layout title="Publications">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Publications
      </Heading>

      <Box my={4}>
        You can find a list of my publications on&nbsp;
        <Link as={NextLink} href="https://ui.adsabs.harvard.edu/public-libraries/_VGfOMavSNaM6jQqVbYhPw">
          ADS
        </Link>
        , on my&nbsp;
        <Link as={NextLink} href="https://orcid.org/0000-0003-4805-6807">
          Orcid Profile
        </Link>
        , or on my&nbsp; 
        <Link as={NextLink} href="https://scholar.google.com/citations?user=J8TJmdsAAAAJ&hl=en">
        Google Scholar profile
        </Link>
        .
      </Box>

    </Container>
  </Layout>
)

export default Papers
// export { getServerSideProps } from '../components/chakra'