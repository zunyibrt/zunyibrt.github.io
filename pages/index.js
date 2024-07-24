import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import Image from 'next/image'
import { GridItem } from '../components/grid-item'
import catImage from '../public/images/cat.jpg'

const Page = () => {
  return (
    <Container> 
        <Box
          borderRadius="lg"
          mb={6}
          p={3}
          textAlign="center"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          css={{ backdropFilter: 'blur(10px)' }}
        >
            There are more things in Heaven and Earth,<br></br>Horatio, 
            than are dreamt of in your philosophy.
        </Box>

        <Box display={{md: "flex" }}>
          <Box flexGrow={1} alignContent={"center"}>
            <Box>
              <Heading as="h2" variant="page-title">
                  Brent Tan / <span style={{fontFamily: "Noto Sans SC"}}>陈遵毅</span>
              </Heading>
            </Box>
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
          I've Worked On
        </Heading>
      <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            href="https://www.youtube.com/"
            title="Cat"
            thumbnail={catImage}
          >
            Cat 1
          </GridItem>
          <GridItem
            href="https://www.youtube.com/"
            title="Cat"
            thumbnail={catImage}
          >
           Cat 2
          </GridItem>
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
            <Link href="mailto:btan@flatironinstiute.org" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<EmailIcon />}
              >
                btan@flatironinstiute.org
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>

    </Container>
  );
}

export default Page