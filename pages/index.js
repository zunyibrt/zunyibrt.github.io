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
import { WorkGridItem } from '../components/grid-item'
import Image from 'next/image'
import neuralcloud from '../public/images/neuralcloudcropped.png'
import slicepainted from '../public/images/slice.png'

const Page = () => {
  return (
    <Container> 
        
        <Box display={{md: "flex" }} mt={{ base: 4, md: 5 }}>
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
            <p> Thinker, Dreamer </p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 5 }}
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
          I'm a Research Software Engineer at the{' '}
          <Link as={NextLink} href="https://research.astro.cornell.edu/" passHref scroll={false}>
            Cornell Center for Astrophysics & Planetary Science
          </Link>
          {' '}, working remotely from New York City. I earned my Ph.D. in 
          Astrophysics from UC Santa Barbara
          and my undergrad at Carnegie Mellon University in Pittsburgh. 
          Before that, I grew up in Singapore.
          My research has centered on the physics 
          of multiphase gas in galactic atmospheres, but lately I've
          become fascinated by mechanistic intepretability in neural networks.
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
          My favourite quote is from Hamlet:<br /><br />
        </Paragraph>
        
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
  
      {/* <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          I've been thinking about
        </Heading>
        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <WorkGridItem id="mechinterp" title="Mechanistic Interpretability" thumbnail={slicepainted}>
            Reverse engineering neural networks to understand how they work
          </WorkGridItem>
          <WorkGridItem id="neuralodes" title="Neural ODEs" thumbnail={neuralcloud}>
            Upgrading our oldest modelling tools with neural networks
          </WorkGridItem>
        </SimpleGrid>
      </Section> */}

      <Section delay={0.2}>
          {/* <Heading as="h3" variant="section-title">
            If you are interested
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
        </Box> */}

        <Heading as="h3" variant="section-title">
          Contact Me
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
            <Link href="mailto:brenttanzunyi@gmail.com" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<EmailIcon />}
              >
                brenttanzunyi@gmail.com
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>

    </Container>
  );
}

export default Page