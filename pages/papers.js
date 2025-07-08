import NextLink from 'next/link'
import { Box, Container, Heading, SimpleGrid, Divider, Flex, useColorModeValue } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import Image from 'next/image'
import rdj from '../public/images/coral_A.png'

const Papers = () => (
<Layout title="Projects">
    <Container>
      <Heading as="h3" fontSize={20} mb={4} mt={5}>
        Personal Projects
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} gap={6}>
        <Section>
          <WorkGridItem id="reactiondiffusion" title="Grey-Scott Model" thumbnail={rdj}>
          Differentiable Reaction-Diffusion Simulation in JAX
          </WorkGridItem>
        </Section>

      </SimpleGrid>
      
    </Container>
  </Layout>
)

export default Papers
// export { getServerSideProps } from '../components/chakra'