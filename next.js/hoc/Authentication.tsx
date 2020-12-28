import { useLazyQuery, useReactiveVar } from '@apollo/client';
import BounceLoader from 'react-spinners/BounceLoader'

import { useRouter } from 'next/router'
import _ from 'lodash'
import React from 'react'

import { EnableFullScreenLoader, IntendedRedirect, IsLoggedIn } from 'graphql/variables'
import routes from 'constants/routes';
import { ME_QUERY } from 'graphql/queries/account';

import variables from './../scss/variables.module.scss'
import { AUTH_TOKEN } from 'constants/common';
import { useAuth } from 'hooks';
import { FullScreenLoader } from 'components/common';

const fullScreenLoaderStyles = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const guestRoutes = [...Object.values(routes.auth)];
const authenticatedRoutes = [
    ...Object.values(routes.account),
    ...Object.values(routes.verification)
];

export const Authentication: React.FC = ({ children }) => {

    const { setLoggedIn, clearLocalSession, activeUser } = useAuth();
    const [dimentions, setDimentations] = React.useState({ width: 0, height: 0 });

    const isLoggedIn = useReactiveVar(IsLoggedIn);
    const enabledFullScreenLoader = useReactiveVar(EnableFullScreenLoader);
    const intendedRedirect = useReactiveVar(IntendedRedirect);

    const router = useRouter();

    const [fetchMe, { loading }] = useLazyQuery(ME_QUERY, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setLoggedIn(data.user);
        }
    });

    const handleIfLoggedIn = () => {

        // handle verification 
        if (activeUser && !activeUser.hasVerifiedEmail && router.pathname !== routes.verification.code) {
            router.replace(routes.verification.code);
        }

        if (activeUser && activeUser.hasVerifiedEmail && _.includes(guestRoutes, router.pathname)) {

            if (intendedRedirect) {
                router.push(intendedRedirect.url);
                IntendedRedirect(null);
            } else {
                router.replace(routes.account.dashboard);
            }
        }
    };

    React.useEffect(() => {

        if (isLoggedIn !== null) {

            // handle authenticated routes
            if (_.includes(authenticatedRoutes, router.pathname)) {

                if (!isLoggedIn) {
                    router.replace(routes.auth.login);
                }

                if (isLoggedIn) {
                    handleIfLoggedIn();
                }
            }

            // handle guest routes
            if (_.includes(guestRoutes, router.pathname)) {
                if (isLoggedIn) {
                    handleIfLoggedIn();
                }
            }
        }

    }, [isLoggedIn]);

    React.useEffect(() => {
        if (localStorage.getItem(AUTH_TOKEN)) {
            fetchMe();
        } else {
            clearLocalSession();
        }
    }, []);

    React.useEffect(() => {

        setDimentations({
            width: window.innerWidth,
            height: window.innerHeight
        });

    }, []);

    if (loading) {
        return (
            <div style={{ ...fullScreenLoaderStyles, ...dimentions }}>
                <BounceLoader color={variables.primary} />
            </div>
        )
    }

    return (
        <>
            {children}
            {enabledFullScreenLoader ? <FullScreenLoader /> : null}
        </>
    )
};
