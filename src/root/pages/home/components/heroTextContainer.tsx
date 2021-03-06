import {
    Button,
    Container,
    createStyles,
    Grid,
    Link,
    makeStyles,
    Slide,
    Snackbar,
    Theme,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React from "react";
import { GithubIconButton } from "../../../iconButtons/buttons/githubIconButton";
import { LinkedInIconButton } from "../../../iconButtons/buttons/linkedInIconButton";
import { ResumeButton } from "../../../iconButtons/buttons/resumeIconButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        overlayText: {
            paddingBottom: theme.spacing(2),
            position: "relative",
            textAlign: "end",
        },
    })
);

const SlideTransition = (props: TransitionProps) => (
    <Slide {...props} direction="right" timeout={200} />
);

export const HeroTextContainer = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Container>
            <Grid item container direction="column" alignItems="flex-end">
                <Grid item>
                    <Link
                        target="_blank"
                        href={process.env.REACT_APP_LINKEDIN_HOMEPAGE_URL}
                    >
                        <Tooltip title="My LinkedIn Homepage" placement="left">
                            <LinkedInIconButton />
                        </Tooltip>
                    </Link>
                </Grid>
                <Grid item>
                    <Link
                        target="_blank"
                        href={process.env.REACT_APP_GITHUB_PROFILE_URL}
                    >
                        <Tooltip title="My Github Profile" placement="left">
                            <GithubIconButton />
                        </Tooltip>
                    </Link>
                </Grid>
                <Grid item>
                    {/* <Link target="_blank" href={process.env.REACT_APP_RESUME_URL}> */}
                    <Tooltip title="My Resume" placement="left">
                        <ResumeButton onClick={handleClick} />
                    </Tooltip>
                    {/* </Link> */}
                </Grid>
            </Grid>
            <Grid
                className={classes.overlayText}
                container
                direction="column"
                alignItems="flex-end"
                spacing={1}
            >
                <Grid item>
                    <Typography variant="h3">Full Stack Engineer</Typography>
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                    <Typography variant="overline">
                        My name is Yehuda Makarov and I make software that is
                        fun to maintain and pleasant to use.
                    </Typography>
                </Grid>
            </Grid>
            <Snackbar
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={<span>The resume will be up soon.</span>}
                action={[
                    <Button
                        key="got-it"
                        onClick={handleClose}
                        size="small"
                        variant="contained"
                        color="secondary"
                    >
                        Got it.
                    </Button>,
                ]}
            />
        </Container>
    );
};
