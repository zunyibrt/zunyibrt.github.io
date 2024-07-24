import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import catImage from '../public/images/cat.jpg'

const Research = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Projects
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>

        <Section>
          <WorkGridItem id="project1" title="Cat 1" thumbnail={catImage}>
            Cat
          </WorkGridItem>
        </Section>

        <Section>
          <WorkGridItem id="project1" title="Cat 2" thumbnail={catImage}>
            Cat
          </WorkGridItem>
        </Section>

        <Section delay={0.1}>
          <WorkGridItem id="project1" title="Cat 3" thumbnail={catImage}>
            Cat
          </WorkGridItem>
        </Section>

        <Section delay={0.1}>
          <WorkGridItem id="project1" thumbnail={catImage} title="Cat 4">
            Cat
          </WorkGridItem>
        </Section>
      </SimpleGrid>

    </Container>
  </Layout>
)

export default Research
// export { getServerSideProps } from '../components/chakra'