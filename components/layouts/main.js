import Head from 'next/head'
import Navbar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Footer from '../footer'
import VoxelLoader from '../voxel-loader'

const VoxelArt = dynamic(() => import('../voxel-model'), {
    ssr: false,
    loading: () => <VoxelLoader />
})

const Main = ({ children, router }) => {
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Brent's homepage" />
                <meta name="author" content="Brent Tan" />
                <title>Brent Tan - Homepage</title>
            </Head>

            <Navbar path={router.asPath} />

            <Container maxW="container.md" pt={14}>
                <VoxelArt />

                {children}

                <Footer />

            </Container>
        </Box>
    )
}

export default Main