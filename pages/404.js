import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Container>
      <Heading as="h1">Wrong Universe </Heading>
      <Text>The page you&apos;re looking for does not exist in this reality.</Text>
      <Divider my={6} />
      <Box my={6} align="center">
        <Button as={NextLink} href="/" colorScheme="teal">
          Take me back home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound