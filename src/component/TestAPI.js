import {useGetCallback} from "use-axios-react";
import Box from "@material-ui/core/Box";
//import Typography from "@material-ui/core/Typography";
//import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//import {CSVLink} from "react-csv";
//import Container from "@material-ui/core/Container";
//import WordTable from "./WordTable";
import React, {useEffect} from "react";
//import WordExtractor from "./WordExtractor";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//import ReactMarkdown from "react-markdown";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const TestAPI = () => {
    const classes = useStyles();

    useEffect(() => {
    }, []);

    function getQueryRequest() {
        return {
            url: "https://api.github.com/repos/gitflashcard/examples/contents/README.md",
        };
    }

    //const [exec, loading, {error, data}] = usePostCallback(postQueryRequest);
    const [exec, loading, {error, data}] = useGetCallback(getQueryRequest);

    const StatusBar = ({loading, error}) => (
        <span>
            {loading && <span>Loading...</span>}
            {error && <span> Error sending requests...</span>}
        </span>
    );

    return (
        <Box my={3}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Box max-height={100}>
                            {data && <div>{data.content}</div>}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3} justify="center">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Box max-height={30}>
                            <StatusBar loading={loading} error={error}></StatusBar>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3} justify="center">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Button size="large" onClick={()=>{exec()}}>Send Request</Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TestAPI;
