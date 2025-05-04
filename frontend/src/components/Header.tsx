import React, { useState, useEffect } from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../backend/fireBase_Auth";

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("s")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("xs")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.green[9],
        fontSize: theme.fontSizes.md,
        fontWeight: 700,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.colors.yellow[1],
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[1]
                    : theme.colors.green[8],
        },
    },

    loginButton: {
        marginRight: "10px",
        padding: "8px 16px",
        backgroundColor: "#56694f",
        color: "#d1e2ca",
        border: "none",
        borderRadius: theme.radius.sm,
        cursor: "pointer",
        fontSize: theme.fontSizes.md,
        fontWeight: 700,

        "&:hover": {
            backgroundColor: "#4a5e41",
        },
    },
}));

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const [user, setUser] = useState<any>(null); 
    const [error, setError] = useState<string | null>(null); 
    const { classes, cx } = useStyles();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
        });

        return () => unsubscribe(); 
    }, []);

   
    const handleLoginClick = async () => {
        if (user) {
        
            try {
                await signOut(auth);
                console.log("User signed out");
                setUser(null); 
            } catch (error: any) {
                setError(`Sign-out failed: ${error.message}`);
            }
        } else {
            // If the user is not logged in, log them in using Google
            try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
                console.log("Signed in with Google");
            } catch (error: any) {
                setError(`Sign-in with Google failed: ${error.message}`);
            }
        }
    };

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link,
            })}
            onClick={() => setActive(link.link)}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={60} style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
            <h3 style={{ color: "#cd9b59" }}>CASH FLOW</h3>
            <Container className={classes.header}>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
            </Container>
            <div>
                <button className={classes.loginButton} onClick={handleLoginClick}>
                    {user ? "Logout" : "Login"}
                </button>
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            </div>
        </Header>
    );
}
