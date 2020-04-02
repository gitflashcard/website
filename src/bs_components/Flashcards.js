import React, { useState, useEffect } from 'react';
//import { withStyles, makeStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import Paper from '@material-ui/core/Paper';
//import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';
import ReactMarkdown from "react-markdown";
import useAxios from 'axios-hooks'
//import { Alert }from '@material-ui/lab';
//import Typography from '@material-ui/core/Typography';
//import ExpansionPanel from '@material-ui/core/ExpansionPanel';
//import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
//import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import Divider from '@material-ui/core/Divider';
import CodeBlock from "../component/CodeBlock";

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import BSFlashcard from "./BSFlashcard";


function useInput(initialValue) {
    const [value,setValue] = useState(initialValue);

    function handleChange(e){
        setValue(e.target.value);
    }

    return [value, handleChange];
}

/*
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
 */

/*
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
        color: 'blue',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
 */


/*
navbar_style = {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
};

 */

const cardStyle = {
    marginTop: "15px",
    marginBottom: "15px",
    right: 0,
    left: 0,
    margin: "0px",
}

const Flashcards = () => {
    const [url, setURL] = useInput("");
    const [quesIndex, setQuesIndex] = useState(-1);
    const [questions, setQuestions] = useState([]);
    const [myError, setMyError] = useState(false);

    const [{ data, loading, error }, executePost] = useAxios({
            url: process.env.REACT_APP_API_URL + "/api/deck",
            method: 'post',
        },
        { manual: false }
    );

    useEffect(() => {
        var questions = [];
        if (data) {
            let cards = data.flashcards;
            for (var i=0; i<cards.length; i++) {
                let quiz = {a_side:"### Q" + (i+1) + " - " + cards[i].front.split("###")[1], b_side:cards[i].back};
                questions.push(quiz);
            }
            setQuestions(questions);
            setMyError(false);
            setQuesIndex(0);
        } else {
            if (error) {
                setMyError(true);
            }
        }
        return () => {
            // exec before running the effects next time
        }
    }, [data, error]);


    const PrevCard = () => {
        if (quesIndex <= 0) {
            return;
        }
        let prevIndex = quesIndex-1;
        setQuesIndex(prevIndex);
    };

    const NextCard = () => {
        if (quesIndex === (questions.length-1)) {
            return;
        }
        let nextIndex = quesIndex+1;
        setQuesIndex(nextIndex);
    }

    /*
    const StatusBar = ({ loading, error }) => {
        if (error) {
            console.log(error);
        }
        return (
            <>
                {loading && <div severity="info">Loading...</div>}
                {error && <div severity="info">Error sending requests...</div>}
            </>
        )
    };
     */

    const LoadDeck = (url) => {
        console.log(url);
        if (url !== "") {
            console.log(url);
            executePost({
                data: {
                    url: url,
                },
                headers: {'Content-Type':'application/json'}
            });
        }
    };

    const LoadBSCard = (index, flashcard) => {
        return (
            <BSFlashcard key={index} question={flashcard.a_side} answer={flashcard.b_side} />
        );
    }

    const FlippyCard = () => {
        return (
            <div>
                <div style={{ position:"relative", margin:"0 auto", marginTop:"5px", width:'550px'}}>
                    <Button style={{ margin:"20px" }} variant="primary" onClick={() => {PrevCard()}}>
                        Previous Card
                    </Button>

                    <b>{quesIndex+1}</b> of total {questions.length} questions

                    <Button style={{ margin:"20px" }} variant="primary" onClick={() => {NextCard()}}>
                        Next Card
                    </Button>
                </div>

                <div>
            <Flippy
                flipOnHover={false} // default false
                flipOnClick={true} // default false
                flipDirection="horizontal" // horizontal or vertical
                style={{ position:"relative", margin:"0 auto", marginTop:"5px", width: '550px', height: 'auto'}} /// these are optional style, it is not necessary
            >
                <FrontSide
                    animationDuration={200}
                    style={{
                        backgroundColor: 'white',
                    }}
                >
                    <ReactMarkdown source={questions[quesIndex].a_side} renderers={{code:CodeBlock}} />
                </FrontSide>
                <BackSide style={{ backgroundColor:"white", height:"auto", zIndex: 1}} animationDuration={200}>
                    <ReactMarkdown source={questions[quesIndex].b_side} renderers={{code:CodeBlock}} />
                </BackSide>
            </Flippy>
                </div>

            </div>
        )
    };

    const LoadBSFlashcards = () => {
        var output = [];
        for (var i=0; i<questions.length; i++) {
            //output.push(LoadCard(i, questions[i]));
            output.push(LoadBSCard(i, questions[i]));
        }
        return output;
    };

    /*

    <Grid container spacing={1} justify="center">

                <Grid item xs={8}>
                    <StatusBar error={myError} loading={loading}/>
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
                    <Button disableElevation variant="contained" color="primary" onClick={()=>{LoadDeck(url)}}>Load Flashcards</Button>
                </Grid>

                {LoadExpansionPanels()}

            </Grid>


     */


/*

{LoadFlippyFlashcards()}

 */

    return (
        <div>
            <Form>
                <Form.Group controlId="url">
                    <Form.Label>Flashcard Data URL</Form.Label>
                    <Form.Control placeholder="Enter URL" onChange={setURL} />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={() => {LoadDeck(url)}}>
                Load Flashcards
            </Button>
            {questions.length > 0 && <FlippyCard></FlippyCard>}
        </div>
    );
}

/*

<Accordion style={cardStyle} defaultActiveKey="0">
                <Card style={cardStyle}>
                    <Accordion.Toggle as={Card.Header}>
                        question
                    </Accordion.Toggle>
                    <Accordion.Collapse>
                        answer
                    </Accordion.Collapse>
                </Card>
            </Accordion>

            <Accordion style={cardStyle} defaultActiveKey="0">
                {LoadFlashcards()}
            </Accordion>

 */

export default Flashcards;
