import { useState } from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    rem,
    Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

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
}));

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link,
            })}
            onClick={(event) => {
                setActive(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={60} style={{display: "flex", alignItems: "center",marginLeft: "10px"}}>
            <h3 style={{color: "#cd9b59"}}>CASH FLOW</h3>
            <Container className={classes.header} >
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size='sm'
                />
            </Container>
            <button style={{marginRight: "10px", backgroundColor: "#56694f", color: "#d1e2ca"}}>Login</button>
        </Header>
    );
}
