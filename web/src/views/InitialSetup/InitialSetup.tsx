import { useTheme, useMediaQuery, makeStyles, createStyles, Container, Typography, Stepper, Step, StepLabel, Box, Button } from "@material-ui/core";
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import { createElement, useCallback, useMemo } from "react";
import { useState } from "react";
import { StepDefinition } from "./StepDefinition";
import Introduction from "./Introduction";
import LinkGoogle from "./LinkGoogle";
import CreateUser from "./CreateUser";
import Finish from "./Finish";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        icon: {
            margin: theme.spacing(8, 0, 4, 0),
        },
        stepper: {
            width: '100%',
        },
        contentBox: {
            width: '100%',
            flexGrow: 1,
        },
        buttonBox: {
            width: '100%',
            padding: theme.spacing(6),
            display: 'flex',
            justifyContent: 'flex-end',
        },
    }),
);

export default function InitialSetup() {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const [nextClicked, setNextClicked] = useState(-1);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const triggerNext = useCallback(() => {
        setActiveStep(activeStep + 1);
    }, [activeStep]);
    
    const steps = useMemo((): StepDefinition[] => [
        { title: '介紹', nextButton: '繼續', content: Introduction },
        { title: '綁定 Google 帳號', content: LinkGoogle },
        { title: '建立使用者', content: CreateUser },
        { title: '完成', content: Finish },
    ], []);

    const nextButton = useMemo(() => steps[activeStep].nextButton, [steps, activeStep]);

    const handleNextClick = useCallback(() => {
        setNextClicked(activeStep);
    }, [activeStep]);

    return (
        <Container maxWidth="sm" className={classes.root}>
            <LocalLibraryOutlinedIcon color="primary" fontSize="large" className={classes.icon} />
            <Typography variant="h5">設定 Conote</Typography>
            <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
                {steps.map((def) =>(
                    <Step key={def.title}>
                        <StepLabel>{def.title}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box className={classes.contentBox}>
                {createElement(
                        steps[activeStep].content,
                        { nextClicked: nextClicked === activeStep, triggerNext: triggerNext }
                )}
            </Box>
            {
                nextButton ?
                    <Box className={classes.buttonBox}>
                        <Button variant="contained" color="primary" onClick={handleNextClick}>
                            {nextButton}
                        </Button>
                    </Box> : ''
            }
        </Container>
    );
}
