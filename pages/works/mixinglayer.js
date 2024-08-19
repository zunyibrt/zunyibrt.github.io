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
  import P from '../../components/paragraph'

  const Work = () => (
    <Layout title="Radiative Turbulent Mixing Layers">
      <Container>
        <Title>
        Radiative Turbulent Mixing Layers <Badge>2021</Badge>
        </Title>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Paper</Meta>
            <Link href="https://ui.adsabs.harvard.edu/abs/2021MNRAS.502.3179T/abstract">
              RTMLS: Insights From Turbulent Combustion <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        <WorkImage src="/images/slice.png"/>

        <P> Radiative mixing layers arise wherever multiphase gas, shear, and radiative cooling are present. Simulations show that in steady state, thermal advection from the hot phase balances radiative cooling. However, many features are puzzling. For instance, hot gas entrainment appears to be numerically converged despite the scale-free, fractal structure of such fronts being unresolved. Additionally, the hot gas heat flux has a characteristic velocity whose strength and scaling are not intuitive. We revisit these issues in 1D and 3D hydrodynamic simulations. We find that over-cooling only happens if numerical diffusion dominates thermal transport; convergence is still possible even when the Field length is unresolved. A deeper physical understanding of radiative fronts can be obtained by exploiting parallels between mixing layers and turbulent combustion, which has well-developed theory and abundant experimental data. A key parameter is the Damköhler number, the ratio of the outer eddy turnover time to the cooling time. Once Da is greater than 1, the front fragments into a multiphase medium. Just as for scalar mixing, the eddy turnover time sets the mixing rate, independent of small scale diffusion. For this reason, thermal conduction often has limited impact. We show that vin and the effective emissivity can be understood in detail by adapting combustion theory scalings. Mean density and temperature profiles can also be reproduced remarkably well by mixing length theory. These results have implications for the structure and survival of cold gas in many settings, and resolution requirements for large scale galaxy simulations. </P> <br/>
      </Container>
    </Layout>
  )
  
  export default Work
  // export { getServerSideProps } from '../../components/chakra'