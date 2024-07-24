import {
    Container,
    Badge,
    Box,
    Link,
    List,
    ListItem,
    AspectRatio
  } from '@chakra-ui/react'
  import { ExternalLinkIcon } from '@chakra-ui/icons'
  import { Title, WorkImage, Meta } from '../../components/work'
  import Layout from '../../components/layouts/article'
  
  const Work = () => (
    <Layout title="Cloudy with A Chance of Rain">
      <Container>
        <Title>
          Cloudy with A Chance of Rain <Badge>2023</Badge>
        </Title>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Paper</Meta>
            <Link href="https://ui.adsabs.harvard.edu/abs/2023MNRAS.520.2571T/abstract">
              Accretion Braking of Cold Clouds <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        Cloud being destroyed.

        <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <Box
          as="iframe"
          title="YouTube video player" 
          src="https://www.youtube.com/embed/0O_Lcb9hWoA?si=FdQ5JwF6i_RrRQm3" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </AspectRatio>

        Cloud Surviving.

        <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <Box
          as="iframe"
          title="YouTube video player" 
          src="https://www.youtube.com/embed/8KbyvrscH7g?si=PeC8d1cnWdOJKDnD" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </AspectRatio>

      </Container>
    </Layout>
  )
  
  export default Work
  // export { getServerSideProps } from '../../components/chakra'