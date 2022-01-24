import { Container, Typography, Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { createElement, useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { StepDefinition } from "./StepDefinition";
import Introduction from "./Introduction";
import LinkGoogle, { LinkGoogleProps } from "./LinkGoogle";
import CreateUser, { CreateUserProps } from "./CreateUser";
import Finish from "./Finish";
import { useHistory } from "react-router-dom";
import { useLayoutEffect } from "react";
import { OAuth2User } from "../../graphql/type/OAuth2User";
import { useQuery } from "@apollo/client";
import { UI_STATUS } from "../../graphql/queries/uiStatus";
import { GraphqlDto } from "../../graphql/type/type";
import { UIStatus } from "../../graphql/type/UIStatus";
import routes from '../../constant/routes.json';

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
    const [oauthUser, setOauthUser] = useState<OAuth2User | null>(null);
    const history = useHistory();

    const { data } = useQuery<GraphqlDto<'uiStatus', UIStatus>>(UI_STATUS);

    useLayoutEffect(() => {
        if (history.location.search) setActiveStep(1);
    }, [history]);

    useEffect(() => {
        if (data && !data.uiStatus.initialSetup) history.push(routes.HOME);
    }, [history, data]);
    
    const steps = useMemo((): StepDefinition<LinkGoogleProps & CreateUserProps>[] => [
        { title: '介紹', nextButton: '繼續', content: Introduction },
        { title: '綁定 Google 帳號', content: LinkGoogle },
        { title: '建立使用者', content: CreateUser, nextButton: '建立' },
        { title: '完成', content: Finish, nextButton: '完成' },
    ], []);

    const nextButton = useMemo(() => steps[activeStep].nextButton, [steps, activeStep]);

    const triggerNext = useCallback(() => {
        setActiveStep(activeStep + 1);
    }, [activeStep]);

    const handleNextClick = useCallback(() => {
        setNextClicked(activeStep);
        setInterval(() => {
            setNextClicked(-1);
        });
    }, [activeStep]);

    const handleOAuthUserRetrieve = (user: OAuth2User) => {
        setOauthUser(user);
    }

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
                        {
                            nextClicked: nextClicked === activeStep,
                            triggerNext: triggerNext,
                            onOAuthUserRetrieve: handleOAuthUserRetrieve,
                            user: oauthUser,
                        }
                )}
            </Box>
            {
                nextButton ?
                    <Box className={classes.buttonBox}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextClick}
                        >
                            {nextButton}
                        </Button>
                    </Box> : ''
            }
        </Container>
    );
}
