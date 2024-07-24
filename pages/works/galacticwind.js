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
    <Layout title="Cloud Atlas">
      <Container>
        <Title>
          Cloud Atlas <Badge>2024</Badge>
        </Title>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Paper</Meta>
            <Link href="https://ui.adsabs.harvard.edu/abs/2024MNRAS.527.9683T/abstract">
                Navigating the Multiphase Landscape of Tempestuous Galactic Winds <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        Galactic Winds

        <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <Box
          as="iframe"
          title="YouTube video player" 
          src="https://www.youtube.com/embed/fARlJPVb-u4?si=awunP4dFF8PFcVb1" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </AspectRatio>

        <AspectRatio maxW="640px" ratio={0.7} my={4}>
        <Box
          as="iframe"
          title="YouTube video player" 
          src="https://youtube.com/embed/KA7-oCNv6rc?si=luHllwgWIXnKVrIK" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </AspectRatio>
        
        Failed Breakout
        <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <Box
          as="iframe"
          title="YouTube video player" 
          src="https://www.youtube.com/embed/yWSZPJmLS5U" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </AspectRatio>

        Turb velocity
        <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <Box
          as="iframe"
          title="YouTube video player" 
          src="https://www.youtube.com/embed/ecyjDqKKfMc" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </AspectRatio>

        Prim
        <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <Box
          as="iframe"
          title="YouTube video player" 
          src="https://www.youtube.com/embed/weyIU16gR1Q" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </AspectRatio>

        <WorkImage src="/images/cloudmodel.jpg"/>
        <WorkImage src="/images/cloudsformevolveiteract.png"/>
        <WorkImage src="/images/slice2.png"/>

      </Container>
    </Layout>
  )
  
  export default Work
  // export { getServerSideProps } from '../../components/chakra'