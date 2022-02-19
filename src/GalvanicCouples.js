import { Component } from "react";
//import Select from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
//import InputLabel from "@mui/material/InputLabel";
//import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
//import Card from "@mui/material/Card";
//import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
const data = require("./data/galvanic_data.json");

const matl_list = Object.keys(data.materials);

function CoatingList(props) {
    // get coating group for both materials
    var grp1 = data["materials"][props.mat1]?.["group"] || "";
    var grp2 = data["materials"][props.mat2]?.["group"] || "";
    var pair_info = data["pairs"]?.[props.pair] || null;

    // create object containing finish lists based on material group
    // {props.pair[1] : finish_1 -> fin_key[finish_1] -> data.surface_treatments[fin_key],
    //  props.pair[3] : finish_2 -> fin_key[finish_2] -> data.surface_treatments[fin_key]}
    var finishes = pair_info
        ? {
              [props.pair[1]]: data.surface_treatments["A.3.".concat(pair_info.finish_1)],
              [props.pair[3]]: data.surface_treatments["A.3.".concat(pair_info.finish_2)]
          }
        : null;
    // console.log(finishes);

    return (
        <Paper align="center" elevation={2}>
            <Grid container spacing={2}>
                <Grid item md>
                    Recommended Coatings: {props.mat1}
                    <ul style={{ textAlign: "left" }}>
                        <li style={{ listStyle: "none" }}>(Most effective)</li>
                        {finishes ? finishes[grp1]["coating_list"].map((f, i) => <li key={i}>{f}</li>) : "..."}
                        <li style={{ listStyle: "none" }}>(Least effective)</li>
                    </ul>
                    Additional Notes:
                    <ul style={{ textAlign: "left" }}>
                    {finishes ? finishes[grp1]["notes"].map((f, i) => <li key={i}>{f}</li>) : "..."}
                    </ul>
                </Grid>
                <Grid item md>
                    Recommended Coatings: {props.mat2}
                    <ul style={{ textAlign: "left" }}>
                        <li style={{ listStyle: "none" }}>(Most effective)</li>
                        {finishes ? finishes[grp2]["coating_list"].map((f, i) => <li key={i}>{f}</li>) : "..."}
                        <li style={{ listStyle: "none" }}>(Least effective)</li>
                    </ul>
                    Additional Notes:
                    <ul style={{ textAlign: "left" }}>
                    {finishes ? finishes[grp2]["notes"].map((f, i) => <li key={i}>{f}</li>) : "..."}
                    </ul>
                </Grid>
            </Grid>
        </Paper>
    );
}

function CoupleCard(props) {
    // get info for chosen pair
    var info = data.pairs[props.pair];
    //console.log(info);

    return (
        <Paper align="center" elevation={2}>
            <table>
                <tbody>
                    <tr>
                        <td align="center">Material 1: {props.mat1}</td>
                        <td></td>
                        <td align="center">Material 2: {props.mat2}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td align="center">
                            Sea Water (Submerged) Compatibility:
                            <br />
                            {info?.rating_sea || "-"}
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td align="center">
                            Marine Atmosphere Compatibility:
                            <br />
                            {info?.rating_ma || "-"}
                        </td>
                        <td></td>
                        <td align="center">
                            Industrial Atmosphere Compatibility:
                            <br />
                            {info?.rating_ia || "-"}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Paper>
    );
}

function MaterialList(props) {
    const { mat_list } = props;
    return mat_list.sort().map((m) => (
        <option key={m} value={m}>
            {m}
        </option>
    ));
}

function NotesList(props) {
    const { notes } = props;
    return notes.map((n) => (
        <option key={n} value={n}>
            {n}
        </option>
    ));
}

export default class GalvanicCouples extends Component {
    constructor(props) {
        super(props);

        this.state = { mat1: "", mat2: "", pair_key: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { mat1, mat2 } = this.state;
        if (mat1 === "" || mat2 === "") {
            // do nothing
            // alert("Please select two materials");
        } else {
            // get coating group for both materials
            const grp1 = data.materials[mat1].group;
            const grp2 = data.materials[mat2].group;
            const sg = [grp1, grp2].sort();

            // create (A,B) key
            const pair_key = "(".concat(sg[0], ",", sg[1], ")");
            //console.log(pair_key);
            this.setState({ pair_key: pair_key });
            //console.log(this.state);
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        var newState = this.state;
        newState[name] = value;
        this.setState(newState);

        this.handleSubmit(e)
    }

    render() {
        return (
            <Box >
                <Paper align="center" elevation={2}>
                    <Box p={2}>
                    <Typography variant="h4">Galvanic Compatibility of Dissimilar Metals</Typography>
                    <Typography variant="h6" align="left">
                        Overview
                    </Typography>
                    <Typography variant="body1" align="left">
                        This application aims to help visualize galvanic compatibility for material pairs per the data in
                        MIL-STD-889-C, Dissimilar Metals. The first card recreates the information shown in Table I for the
                        chosen material pair. The second card lists the recommended surface treatments in order of descending
                        effectivity per Appendix A.3.
                    </Typography>
                    <br />
                    <Typography variant="h6" align="left">
                        Legend
                    </Typography>
                    <Typography variant="body1" align="left">
                        I: "Incompatible" - Signifies significant galvanic corrosion will occur between bare (uncoated) dissimilar metal pair subject to
                        the specific environment. <br />
                        C: "Compatible" - Signifies negligible galvanic interaction will occur between bare (uncoated) dissimilar metal pair subject
                        to the specific environment. <br />
                        G: Signifies compatibility of bare (uncoated) same-metal couple subject to the specific environment.
                    </Typography>
                    <br />
                    <Typography variant="h6">Inputs</Typography>
                    </Box>
                    <form pb={2}>
                        <Grid container spacing={2}>
                            <Grid item sm>
                                <FormControl>
                                    <label htmlFor="mat1-select">Material 1</label>
                                    <select
                                        id="mat1-select"
                                        name="mat1"
                                        label="Material 1"
                                        value={this.state.mat1}
                                        onChange={this.handleChange}>
                                        <option key="blank" value="" disabled>
                                            -
                                        </option>
                                        <MaterialList mat_list={matl_list} />
                                    </select>
                                </FormControl>
                            </Grid>
                            <Grid item sm>
                                <FormControl>
                                    <label htmlFor="mat2-select">Material 2</label>
                                    <select
                                        id="mat2-select"
                                        name="mat2"
                                        label="Material 2"
                                        value={this.state.mat2}
                                        onChange={this.handleChange}>
                                        <option key="blank" value="" disabled>
                                            -
                                        </option>
                                        <MaterialList mat_list={matl_list} />
                                    </select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                    <br />
                </Paper>
                <br />
                <CoupleCard mat1={this.state.mat1} mat2={this.state.mat2} pair={this.state.pair_key} />
                <br />
                <CoatingList mat1={this.state.mat1} mat2={this.state.mat2} pair={this.state.pair_key} />
            </Box>
        );
    }
}
