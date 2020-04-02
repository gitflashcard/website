import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import useAxios from 'axios-hooks'
import CodeBlock from "../component/CodeBlock";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Button } from "react-bootstrap";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import BSFlashcard from "./BSFlashcard";

function useInput(initialValue) {
    const [value,setValue] = useState(initialValue);

    function handleChange(e){
        setValue(e.target.value);
    }

    return [value, handleChange];
}

const FlippyFlashcards = () => {
    const [url, setURL] = useInput("");
    const [quesIndex, setQuesIndex] = useState(-1);
    const [questions, setQuestions] = useState([]);
    const [myError, setMyError] = useState("");

    const [{ data, loading, error }, executePost] = useAxios({
            url: process.env.REACT_APP_API_URL + "/api/deck",
            method: 'post',
        },
        { manual: true }
    );

    useEffect(() => {
        var questions = [];

        if (data) {
            let cards = data.flashcards;
            for (var i=0; i<cards.length; i++) {
                //let quiz = {a_side:"### Q" + (i+1) + " - " + cards[i].front.split("###")[1], b_side:cards[i].back};
                let quiz = {a_side:cards[i].front, b_side:cards[i].back};
                questions.push(quiz);
            }
            setQuestions(questions);
            //console.log("q count: " + questions.length);
            setMyError("");
            setQuesIndex(0);
        } else {
            console.log(error);
            if (error) {
                setMyError("error sending requests, please check your URL");
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

    const LoadDeck = () => {
        if (url.startsWith("http")) {
            executePost({
                data: {
                    url: url,
                },
                validateStatus: (status) => {
                    console.log("response status code, " + status);
                    setMyError("error getting the page, please check URL again");
                    return true; // I'm always returning true, you may want to do it depending on the status received
                },
                headers: {'Content-Type':'application/json'}
            });
        } else {
            setMyError("Please enter a valid URL.")
        }
    };

    const LoadBSCard = (index, flashcard) => {
        return (
            <BSFlashcard key={index} question={flashcard.a_side} answer={flashcard.b_side} />
        );
    }

    const FlippyCard = () => {
        return (
            <>
                <div style={{position:"relative", margin:"0 auto", width:"100%", marginTop:"15px", textAlign:"center"}}>
                    {quesIndex+1} of total {questions.length} questions
                </div>

                <div style={{position:"relative", margin:"0 auto", display:"flex", width:"100%", marginTop:"5px"}}>

                    <div style={{ display:"flex", justifyContent: "center", alignItems: "center", margin:"0 auto", width:"95%" }}>

                        <Flippy
                            flipOnHover={false}
                            flipOnClick={true}
                            flipDirection="horizontal"
                            style={{ position:"relative", margin:"0 auto", marginTop:"5px", width: '100%'}} /// these are optional style, it is not necessary
                        >
                            <FrontSide
                                animationDuration={500}
                                style={{
                                    backgroundColor: 'white',
                                    minHeight: '350px'
                                }}
                            >
                                <div style={{display:"flex", justifyContent: "center", alignItems: "center", margin:"0 auto", padding:"10px", minHeight:"350px"}}>
                                    <ReactMarkdown source={questions[quesIndex].a_side} renderers={{code:CodeBlock}} />
                                </div>
                            </FrontSide>

                            <BackSide style={{ backgroundColor:"white", height:"auto"}} animationDuration={500}>
                                <div style={{display:"flex", alignItems: "center", margin:"0 auto", padding:"5px", minHeight:"350px", overflow:"auto"}}>
                                    <div style={{alignItems: "center", margin:"0 auto", padding:"5px"}}>
                                        <ReactMarkdown source={questions[quesIndex].b_side} renderers={{code:CodeBlock}} />
                                    </div>
                                </div>
                            </BackSide>

                        </Flippy>
                    </div>

                </div>

                <div style={{position:"flex", margin:"0 auto", width:"100%", marginTop:"20px", textAlign:"center", marginBottom:"50px"}}>
                    <div className="d-flex bd-highlight mb-3">
                        <div className="p-2 bd-highlight" style={{width:"50%"}}>
                            <Button style={{width:"100%"}} variant="primary" onClick={() => {PrevCard()}}>
                                Previous Card
                            </Button>
                        </div>
                        <div className="ml-auto p-2 bd-highlight" style={{width:"50%"}}>
                            <Button style={{width:"100%"}} variant="primary" onClick={() => {NextCard()}}>
                                Next Card
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )
    };

    return (
        <div>
            <Form>
                <Form.Group controlId="url">
                    <Form.Label>Flashcard Data URL</Form.Label>
                    <Form.Control placeholder="Enter URL" onChange={setURL} />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={() => {LoadDeck()}}>
                Load Flashcards
            </Button>
            {loading && <Alert style={{marginTop:"10px"}} variant="success">{"Loading flashcards..."}</Alert>}
            {myError && <Alert style={{marginTop:"10px"}} variant="danger">{myError}</Alert>}
            {questions.length > 0 && <FlippyCard></FlippyCard>}
        </div>
    );
}

export default FlippyFlashcards;
