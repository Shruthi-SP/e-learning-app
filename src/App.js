import { Container, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

function App(props) {
  return (
    <div >
      <Container>
        <Typography variant="h3" sx={{mt:3 , textAlign:'center'}}>Welcome to e-learning app</Typography>
        <Navbar />
      </Container>
    </div>
  );
}

export default withRouter(App)
