import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ReactMarkdown from "react-markdown";
import useAxios from 'axios-hooks'
import { Alert }from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import CodeBlock from "./CodeBlock";

function useInput(initialValue) {
    const [value,setValue] = useState(initialValue);

    function handleChange(e){
        setValue(e.target.value);
    }

    return [value, handleChange];
}

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: '#e1f3fb',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    panel: {
        width: '80%',
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    margin: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    heading: {
        color: 'black',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Flashcard = () => {
    const [url, setURL] = useInput("");
    const [questions, setQuestions] = useState([]);
    //const [index, setIndex] = useState(-1);
    //const [cardContent, setCardContent] = useState("");
    //const [showAnswer, setShowAnswer] = useState(false);
    const [{ data, loading, error }, executePost] = useAxios({
            url: process.env.REACT_APP_API_URL + "/api/deck",
            method: 'post',
        },
        { manual: true }
    );
    const classes = useStyles();

    useEffect(() => {
        var questions = [];
        console.log(data);
        if (data) {
            let cards = data.flashcards;
            for (var i=0; i<cards.length; i++) {
                let quiz = {a_side:cards[i].front, b_side:cards[i].back};
                questions.push(quiz);
                console.log(quiz)
            }
            setQuestions(questions);
            //setCardContent(questions[0].a_side);
            //setIndex(0);
        }
    }, [data]);

    /*
    const PrevQuestion = () => {
        if (index <= 0) {
            return;
        }
        let prevIndex = index-1;
        setCardContent(questions[prevIndex].a_side);
        setIndex(prevIndex);
        setShowAnswer(false);
    }
     */

    /*
    const NextQuestion = () => {
        if (index === (questions.length-1)) {
            return;
        }
        let nextIndex = index+1;
        setCardContent(questions[nextIndex].a_side);
        setIndex(nextIndex);
        setShowAnswer(false);
    }
     */

    const StatusBar = ({ loading, error }) => {
        if (error) {
            console.log(error);
        }
        //<Grid container spacing={4} justify="center">
        return (
            <>
                {loading && <Alert severity="info">Loading...</Alert>}
                {error && <Alert severity="info">Error sending requests...</Alert>}
                {url && (questions !== []) && <Alert severity="info">Flashcards loaded from {url} </Alert>}
            </>
        )
    };

    const LoadDeck = () => {
        executePost({
            data: {
                url: "test_url"
            },
            headers: {'Content-Type':'application/json'}
        });
    }

    const LoadPanel = (flashcard) => {
        return (
            <div className={classes.panel}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            <ReactMarkdown source={flashcard.a_side} renderers={{code:CodeBlock}} />
                        </Typography>
                    </ExpansionPanelSummary>
                    <Divider />
                    <ExpansionPanelDetails >
                        <Typography className={classes.details}>
                            <ReactMarkdown source={flashcard.b_side} renderers={{code:CodeBlock}} />
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }

    const LoadExpansionPanels = () => {
        var output = [];
        for (var i=0; i<questions.length; i++) {
            output.push(LoadPanel(questions[i]));
        }
        return output;
    }

    /*

<Grid container spacing={3} justify="center">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Box max-height={100}>
                            <ReactMarkdown source={cardContent} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3} justify="center">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Box height={150}>
                            <Typography align="left">
                            {showAnswer && <ReactMarkdown source={questions[index].b_side} renderers={{code:CodeBlock}} />}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3} justify="center">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Button className={classes.margin} disableElevation size="large" variant="contained" color="primary" onClick={()=>{PrevQuestion()}}>Previous Card</Button>
                        <Button className={classes.margin} disableElevation size="large" variant="contained" color="primary" onClick={()=>{setShowAnswer(true)}}>Show Answer</Button>
                        <Button className={classes.margin} disableElevation size="large" variant="contained" color="primary" onClick={()=>{NextQuestion()}}>Next Card</Button>
                    </Paper>
                </Grid>
            </Grid>


     */

    return (
        <div className={classes.root}>
            <Grid container spacing={1} justify="center">

                <Grid item xs={8}>
                    <StatusBar error={error} loading={loading}/>
                </Grid>

                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <TextField
                            label="Questions URL"
                            style={{ margin: 1 }}
                            placeholder="github.com"
                            helperText="please enter the URL of your markdown flash card questions"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            color="primary"
                            value={url}
                            onChange={setURL}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Button disableElevation variant="contained" color="primary" onClick={()=>{LoadDeck()}}>Load Flashcards</Button>
                </Grid>

                {LoadExpansionPanels()}

            </Grid>

        </div>
    );
}

export default Flashcard
