import React from 'react'
import { Button } from 'react-bootstrap'
import SocialLogin from 'react-social-login'

interface Props {
    triggerLogin(): void
    variant: string
}

class SB extends React.Component<Props> {

    render() {

        const { children, triggerLogin, variant } = this.props;

        return (
            <Button
                variant={variant}
                className="mb-2 mb-sm-0 d-flex align-items-center justify-content-center"
                size="lg"
                block
                onClick={triggerLogin}
            >
                {children}
            </Button>
        )
    }
}

export const SocialButton = SocialLogin(SB);