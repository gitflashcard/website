import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function DrawerNavbar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [loggedIn, setLogin] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        console.log(token);
        if (token !== "") {
            setLogin(true);
            console.log("user is logged in");
        }
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const doLogout = () => {
        localStorage.setItem("token", "");
        setLogin(false);
        console.log("user is logged out");
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Grid
                        justify="flex-start"
                        container
                    >
                        <Grid item>
                            <Typography variant="h6" noWrap>
                                Git Flashcard
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        justify="flex-end"
                        container
                    >
                    </Grid>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                {loggedIn ?
                <List>
                    <ListItem button component="a" href="/tokentest">
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Hello With Token" />
                    </ListItem>
                    <ListItem button component="a" href="/">
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component="a" href="/add-user">
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Add User" />
                    </ListItem>
                    <ListItem button component="a" href="/edit-user">
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Edit User" />
                    </ListItem>
                    <ListItem button component="a" href="/users">
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="List Users" />
                    </ListItem>
                    <ListItem button component="a" href="https://www.github.com">
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Github" />
                    </ListItem>
                </List> : null }
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
            </main>
        </div>
    );
}
