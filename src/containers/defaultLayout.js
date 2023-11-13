import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
    CHeaderNav,
} from '@coreui/react';
import { Container } from 'reactstrap';
import Header from '../../containers/defaultHeader';

class DefaultHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        const { children} = this.props;

        return (
            <div className="app">
                <CHeaderNav>
                    <Header className="header" />
                </CHeaderNav>
                <div className="app-body">
                    <Container>
                        {children}
                    </Container>
                </div>
            </div>
        );
    }
}

export default withTranslation()(DefaultHeader);
