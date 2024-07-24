import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  Flex,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons'
import { IoLogoTwitter, IoLogoGithub } from 'react-icons/io5'
import { GridItem, WorkGridItem } from '../components/grid-item'
import Image from 'next/image'
import neuralcloud from '../public/images/neuralcloudcropped.png'
import slicepainted from '../public/images/slice.png'

const Page = () => {
  return (
    <Container> 
        <Flex
          direction={{
            base: "column",
            sm: "row"
          }}
          wrap = "wrap"
          borderRadius="lg"
          mb={6}
          p={3}
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          css={{ backdropFilter: 'blur(10px)' }}
        >
          <Box 
            flexGrow={1}
            flexShrink={0} 
            textAlign={{
              base: "center",
              sm: "right"
            }}
          >
            There are more things&nbsp; 
          </Box>
          <Box 
            flexGrow={1}
            flexShrink={0} 
            textAlign={{
              base: "center",
              sm: "left"
            }}
          >
            in Heaven and Earth,
          </Box>
          <Box 
            flexGrow={1}
            flexShrink={0} 
            textAlign={{
              base: "center",
              sm: "right"
            }}
          >
            Horatio, than are dreamt&nbsp; 
          </Box>
          <Box 
            flexGrow={1}
            flexShrink={0} 
            textAlign={{
              base: "center",
              sm: "left"
            }}
          >
            of in your philosophy.
          </Box>
        </Flex>

        <Box display={{md: "flex" }}>
          <Box flexGrow={1} alignContent={"center"}>
            <Flex 
              direction={{
                base: "column",
                sm: "row"
              }}
              wrap = "wrap"
            >
              <Heading as="h2" variant="page-title">
                Brent Tan&nbsp;
              </Heading>
              <Heading as="h2" variant="page-title">
                / <span style={{fontFamily: "Noto Sans SC"}}>陈遵毅</span>
              </Heading>
            </Flex>
            <p> Flatiron Research Fellow </p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              w="250px"
              h="250px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <Image
                src="/images/headshot.jpg"
                alt="Profile image"
                width="250"
                height="250"
                
              />
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Hi There!
        </Heading>
        <Paragraph>
          I'm currently a Flatiron Research Fellow in the{' '}
          <Link as={NextLink} href="https://www.simonsfoundation.org/flatiron/center-for-computational-astrophysics/" passHref scroll={false}>
            Center for Computational Astrophysics
          </Link>
          {' '}at the{' '}
          <Link as={NextLink} href="https://www.simonsfoundation.org/flatiron/" passHref scroll={false}>
            Flatiron Institute
          </Link>
          {' '}in New York City. I received my Ph.D. in Astrophysics from the University of Santa Barbara. 
          My Research focuses on the physics of multiphase gas in the context of the CGM and feedback in galaxies.
          
        </Paragraph>
        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/resume.pdf"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            My CV


          </Button>
        </Box>
      </Section>
  
      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Some Things I've Worked On
        </Heading>
        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <WorkGridItem id="neuralodes" title="Neural ODEs" thumbnail={neuralcloud}>
            Neural ODEs and Symbolic Regression for Infalling Clouds
          </WorkGridItem>
          <WorkGridItem id="mixinglayer" title="Turbulent Mixing Layers" thumbnail={slicepainted}>
          Radiative Turbulent Mixing layers
          </WorkGridItem>
        </SimpleGrid>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          You Can Reach Me At
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/zunyibrt" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @zunyibrt
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/BrentTanZY" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoTwitter />}
              >
                @BrentTanZY
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="mailto:btan@flatironinstitute.org" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<EmailIcon />}
              >
                btan@flatironinstitute.org
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>

    </Container>
  );
}

export default Page