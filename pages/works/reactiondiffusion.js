import {
    Container,
    Badge,
    Box,
    Link,
    List,
    ListItem,
    AspectRatio
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import { ExternalLinkIcon } from '@chakra-ui/icons'
  import { Title2, WorkImage, Meta } from '../../components/work'
  import Layout from '../../components/layouts/article'
  
  const Work = () => (
    <Layout title="Reaction Diffusion">
      <Container>
        <Title2>
        Differentiable Reaction Diffusion in JAX <Badge>2024</Badge>
        </Title2>
        
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Code</Meta>
            <Link href="https://github.com/zunyibrt/reaction-diffusion-jax">
            Differentiable Reaction Diffusion in JAX  <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>
        
        Differentiable Reaction Diffusion in JAX. <br />

        Some useful links about the Gray-Scott Model:
        <List ml={4} my={4}>
          <ListItem>
          <Link as={NextLink} href="https://www.karlsims.com/rd.html">
           Explanation by Karl Sims
          </Link>
          </ListItem>  
          <ListItem>
          <Link as={NextLink} href="https://rajeshrinet.github.io/blog/2016/gray-scott/">
            Gray-Scott Python Implementation
          </Link>
          </ListItem>
          <ListItem>
          <Link as={NextLink} href="https://selforglive.github.io/alife_rd_textures/">
            Differentiable Programming of Reaction Diffusion Patterns
          </Link>
          </ListItem>
          <ListItem>
          <Link as={NextLink} href="https://www.dna.caltech.edu/courses/cs191/paperscs191/turing.pdf">
            Alan Turing's paper on morphogenesis
          </Link>
          </ListItem>
        </ List>

        <WorkImage src="/images/bacteria_A.png"/>
        <WorkImage src="/images/bacteria_B.png"/>
        <WorkImage src="/images/coral_A.png"/>
        <WorkImage src="/images/coral_B.png"/>
        <WorkImage src="/images/spiral_A.png"/>
        <WorkImage src="/images/spiral_B.png"/>
        <WorkImage src="/images/zebrafish_A.png"/>
        <WorkImage src="/images/zebrafish_B.png"/>

      </Container>
    </Layout>
  )
  
  export default Work
  // export { getServerSideProps } from '../../components/chakra'