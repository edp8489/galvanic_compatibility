import GalvanicCouples from "./GalvanicCouples";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const customTheme = createTheme({
    palette: {
        background: {
            default: "#bdbdbd"
        }
    }
})

export default function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline>
                <Container className="App">
                    <GalvanicCouples />
                    <div className="credits" style={{
                        fontSize: '0.8em',
                        margin: '8em auto -4em auto',
                        textAlign: 'center',
                    }} >
                        ©&nbsp;2022&nbsp;Eric Peters
                        &nbsp;
                        •
                        &nbsp;
                        <a href="https://edp8489.github.io">Homepage</a>
                        &nbsp;
                        •
                        &nbsp;
                        <a href="https://www.linkedin.com/in/eric-peters-a187aa17/">Linkedin</a>
                        &nbsp;
                        •
                        &nbsp;
                        <a href="https://github.com/edp8489">github</a>
                    </div>
                </Container>
            </CssBaseline>
        </ThemeProvider>
    );
}
