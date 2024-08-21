import {
    Container,
    Badge,
    Box,
    Link,
    List,
    ListItem,
    Heading,
    AspectRatio
  } from '@chakra-ui/react'
  import { ExternalLinkIcon } from '@chakra-ui/icons'
  import { Title, WorkImage, Meta } from '../../components/work'
  import Layout from '../../components/layouts/article'
  import P from '../../components/paragraph'
  
  const Work = () => (
    <Layout title="Neural ODEs and Symbolic Regression">
      <Container>
        <Title>
        Neural ODEs and Symbolic Regression <Badge>2024</Badge>
        </Title>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Paper</Meta>
            <Link href="https://arxiv.org/abs/2408.10387">
            Neural ODEs and Symbolic Regression <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Code</Meta>
            <Link href="https://github.com/zunyibrt/Neural-Infalling-Cloud-Equations">
            Github Link <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        <WorkImage src="/images/neuralcloudcropped.png"/>

        <P> A key open problem in galaxy evolution is the discrepancy between observed star formation rates (SFRs) in galaxies and their available gas reservoirs. The observed SFRs are unsustainable over cosmic timescales, indicating a need for continuous gas accretion to fuel star formation. There is observational evidence for the existence of such inflows, in the form of  ‘high-velocity’ and ‘intermediate-velocity’ clouds and fountain-like transport where clouds are lifted out of the disk by supernova-driven winds before falling back. One of the primary challenges in modeling these interactions is accurately simulating the complex interplay between the cold clouds and the hot ambient medium. Hydrodynamic instabilities can shred the clouds into smaller fragments, potentially destroying them. The cloud's ability to survive depends on various factors, including its size, density, and the efficiency of radiative cooling within the turbulent mixing layers formed at the interface between the cold and hot gases. Accurately capturing these small-scale processes requires prohibitively high spatial and temporal resolution. One solution is to develop subgrid models that can capture the effects of unresolved processes. Such models can be formulated and tested against smaller scale high resolution simulations, or in semi-analytical models. Improving the fidelity of these subgrid models is critical towards advancing galaxy simulations. </P> <br/>
        <P> Neural ODEs (NODEs) are ODEs which include neural networks (NNs) in their parameterizations. They have been applied in a wide range of domains, including neuroscience, fluid mechanics, climate science and epidemiology. NODEs offer a way to combine traditional models with deep learning and its strength in serving as high-capacity function approximators, and hence improve the predictive power of the model. This opens the door to using Symbolic Regression (SR) effectively to discover new insights into the underlying physics of the system by limiting the scope of the physical process the NN captures (one primary challenge of SR is how quickly the search space scales with complexity). In this work, we use NODEs to improve the predictive accuracy of subgrid models for infalling clouds, and SR to potentially discover new insights into the physics of cloud-environment interactions. </P> <br/>

        <P> Our data suite consists of 13 3D Athena++ simulations, 7 of which are used for training and 6 for testing. We use the same initial conditions for all simulations, with the only difference being the initial cloud size. The cloud sizes range from 30 pc to 1 kpc. Each simulation generates 1000 data points spanning a time range of up to 225 Myr. The dataset is small since running large high resolution 3D simulations is computationally expensive. However, we show that we are still able to achieve good model performance. </P> <br/>

        <P> To construct, solve, and train the NODE, we use the JAX framework heavily, along with the software libraries Diffrax for differential equations and Equinox for NNs. This enables us to train on a single CPU core on the order of minutes. Our NODE model consists of equations with the weight factor replaced by a NN. The NN is a multilayer perceptron with 3 hidden layers of 32 nodes each. Each layer uses a GELU activation function. Weights are initialized using a Xavier/Glorot initialization scheme. We use the ADAMW optimizer, and train the network in 2 stages. In the first stage, we train for 1300 steps on the first 20% of the time series. In the second stage, we train for 3500 steps on the entire training data. This is a common strategy in training NODEs to avoid getting initially trapped in local minima. The NN takes in distance, velocity, mass and the initial cloud size as inputs. All input data into the NN is normalized, and the mass which can grow by orders of magnitude over the simulation is log-transformed. The output is a single value corresponding to the weight factor. </P> <br/>

        <P> We calculate our loss function as the mean squared error between the predicted and actual mass solutions. We find that only including the mass in  instead of all changing variables improves training stability since the mass is the quantity most directly sensitive to the growth rate. We also multiply the loss by a coefficient which decreases over time.
        This coefficient starts at 1 and then decreases linearly over time to a low of 0.1. This focuses the model on earlier times, which improves the training process in NODEs where late time values are sensitive to earlier ones. We numerically solve the ODEs using Tsitouras' 5/4 method, which is a 4th order explicit Runge-Kutta method when using adaptive step sizing, which we employ via a PID controller. For SR, we use the package PySR. We include physical units to so as to favor dimensionally consistent equations. </P> <br/>

        <P> A full decription of the model equations and our results can be found in the linked paper at the top of the page. </P> <br/>

        

      </Container>
    </Layout>
  )
  
  export default Work
  // export { getServerSideProps } from '../../components/chakra'