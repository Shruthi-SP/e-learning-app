import { Container, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Helmet from "react-helmet";

function App(props) {
  return (
    <div >
      <Container>
        <Helmet>
          <title>E-Learning App</title>
          <meta name="description" content="E-Learning app" />
        </Helmet>
        <Typography variant="h3" sx={{ mt: 3, mb: 3, textAlign: 'center' }}>Welcome to e-learning app</Typography>
        <Navbar />
      </Container>
    </div>
  );
}

export default withRouter(App)
