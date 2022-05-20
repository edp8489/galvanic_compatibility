import GalvanicCouples from "./GalvanicCouples";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {light, dark} from "./styles.js";
import NavBar from "./NavBar";

const customTheme = createTheme({
    palette: {
        background: {
            default: "#bdbdbd"
        }
    }
})

// defined using let instead of const in case you want to set
// other elements later based on primary/secondary colors
let lightTheme = light
let darkTheme = dark

export default function App() {
    const [darkMode, toggleDark] = React.useState(false);
    let theme = darkMode ? darkTheme : lightTheme;
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Container className="App" sx={{ textAlign: "center", width: "75%", marginLeft:"12.5%", marginRight:"12.5%" }}>
                    <NavBar themeToggle={() => toggleDark( !darkMode )} />
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
