import React from 'react';
import './App.css';
import Flashcard from "./component/Flashcard";
import DrawerNavbar from "./component/DrawerNavbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Container from '@material-ui/core/Container';
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


/*
<div className="App">
</div>
<Route path="/" exact component={ListUserComponent} />
                    <Route path="/users" component={ListUserComponent} />
                    <Route path="/add-user" component={AddUserComponent} />
                    <Route path="/edit-user" component={EditUserComponent} />
                    <Route path="/tokentest" component={TokenTest} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
 */


function App() {

    const Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://gitflashcard.com/">
                    gitflashcard.com
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

  return (
    <div>
        <Container>
            <Router>
                <DrawerNavbar/>
                <Switch>
                </Switch>
                <Flashcard/>
            </Router>
            <Box pt={4} marginBottom="200px">
                <Copyright />
            </Box>
        </Container>
    </div>
  );
}

export default App;
