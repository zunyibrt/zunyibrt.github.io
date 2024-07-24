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
    <Layout title="Radiative Turbulent Mixing Layers">
      <Container>
        <Title>
        Radiative Turbulent Mixing Layers <Badge>2021</Badge>
        </Title>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Paper</Meta>
            <Link href="https://ui.adsabs.harvard.edu/abs/2021MNRAS.502.3179T/abstract">
              RTMLS: Insights From Turbulent Combustion <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        Radiative Turbulent Mixing Layers
        {/* Drummond */}

        {/* <AspectRatio maxW="640px" ratio={2.3} my={4}>
        <Box
          as="iframe"
          title="YouTube video player" 
          src="https://player.vimeo.com/video/392493040?h=5182a2b47a"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </AspectRatio> */}
        {/* <WorkImage src="/images/works/inkdrop_01.png" alt="Inkdrop" /> */}

      </Container>
    </Layout>
  )
  
  export default Work
  // export { getServerSideProps } from '../../components/chakra'