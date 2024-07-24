import { Box, Container, Heading, SimpleGrid, Divider, Flex, useColorModeValue } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import Image from 'next/image'

import cloudatlas from '../public/images/cloudatlas.png'
import overview_scales from '../public/images/overview_scales.png'
import futurefocus from '../public/images/futureprojects.png'
import ARAA from '../public/images/ARAA.png'
import growcloud from '../public/images/growcloud.png'
import mllr from '../public/images/mllr.png'
import neuralcloud from '../public/images/neuralcloudcropped.png'
import slicepainted from '../public/images/slice.png'

const Research = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Cool Things That Matter
      </Heading>

      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
          Some say the world will end in fire,<br/>
          Some say in ice.<br/>
          From what I’ve tasted of desire<br/>
          I hold with those who favor fire.<br/>
          But if it had to perish twice,<br/>
          I think I know enough of hate<br/>
          To say that for destruction ice<br/>
          Is also great<br/>
          And would suffice.<br/>
          - Robert Frost
        </Box>

      In broad strokes, my primary research interest lies in the physics of the multiphase environments in and around galaxies. This encompasses the galaxies themselves, the vast reservoir of material that surrounds them (known as the circumgalactic medium (CGM)), and the flows that connect the two. These flows govern galaxy growth and evolution by coupling the galaxies and their CGM. Outflows transport material away from the galaxy, while inflows set the fuel budget for future star formation. They hence comprise much of the machinery by which galaxies self-regulate.

      <Box w="100%" textAlign="center" my={6}>
        <Image
          src={ARAA}
          alt="Simulation Scales"
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
        /> 
      </Box>
      Faucher-Giguere & Oh 2023 {/* https://ui.adsabs.harvard.edu/abs/2023ARA%26A..61..131F/abstract */}

      A large focus of my work is studying how the multiphase nature of these systems, which observations have steadily uncovered, shape them. Despite being ubiquitous, many uncertainties remain due to their surprisingly rich complexity. Combining analytic theory with numerical simulations, I investigate their inner workings so as to understand and model them. 

      The projects below are presented in a systemic way, starting at the smallest scales in the problem with a deep dive into the interfaces between phases and how they determine bulk evolution. The following work then explores the connection between these mixing layers and observables. Applying these results to larger scales, I also looked at cold clouds moving through hot backgrounds, both infalling under gravity and in turbulent outflowing winds. The laddering of scales in my simulations:
      {/* Snapshots from my simulations showing the hierarchy of scales in this summary. Sections 1 and 2 deal with radiative turbulent mixing layers, while 3 and 4 deal with individual clouds and galactic winds respectively. */}
      <Box w="100%" textAlign="center" my={6}>
        <Image
          src={overview_scales}
          alt="Simulation Scales"
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
        /> 
      </Box>
      Recently, I have been extending this work in several directions, including trying to understand the roles of thermal conduction and magnetic fields in these systems. I am also exploring the application of machine learning techniques to tackle some of these problems.
      <Box w="100%" textAlign="center" my={6}>
        <Image
          src={futurefocus}
          alt="Simulation Scales"
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
        /> 
      </Box>
      
      <Divider my={6} />
      <Heading as="h3" fontSize={20} mb={4}>
        Projects
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} gap={6}>

        <Section>
          <WorkGridItem id="neuralodes" title="Neural ODEs" thumbnail={neuralcloud}>
            Neural ODEs and Symbolic Regression for Infalling Clouds
          </WorkGridItem>
        </Section>

        <Section>
          <WorkGridItem id="galacticwind" thumbnail={cloudatlas} title="Galactic Winds">
            Galactic Winds
          </WorkGridItem>
        </Section>

        <Section delay={0.1}>
          <WorkGridItem id="infallingcloud" title="Infalling Cold Clouds" thumbnail={growcloud}>
          Infalling Cold Clouds
          </WorkGridItem>
        </Section>

        <Section delay={0.1}>
          <WorkGridItem id="observables" title="Modelling Observables" thumbnail={mllr}>
            Line Absorption//Emission in RTMLS
          </WorkGridItem>
        </Section>

        <Section delay={0.2}>
          <WorkGridItem id="mixinglayer" title="Turbulent Mixing Layers" thumbnail={slicepainted}>
            Radiative Mixing (RTMLs)
          </WorkGridItem>
        </Section>
      </SimpleGrid>

    </Container>
  </Layout>
)

export default Research
// export { getServerSideProps } from '../components/chakra'