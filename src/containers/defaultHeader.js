import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
    CContainer, CHeaderBrand
} from '@coreui/react';
import { Col, Button } from 'reactstrap';

class DefaultHeader extends Component {
    constructor(props) {
        super(props)
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    }

    handleChangeLanguage(event, language) {
        event.preventDefault();

        const { i18n } = this.props;

        i18n.changeLanguage(language)
    }

    render() {
        return (
            <div className='app-header'>
                <CContainer fluid>
                    <Col className='justify-content-center'>
                        <CHeaderBrand href="/home">Home Page</CHeaderBrand>
                    </Col>
                    <Col className='justify-content-center'>
                        <CHeaderBrand href="/people">Pessoa</CHeaderBrand>
                    </Col>
                    <Col className='justify-content-center'>
                        <CHeaderBrand href="/user">Usuários</CHeaderBrand>
                    </Col>
                    <Col className='justify-content-end'>
                        <Button
                            type='button'
                            id='ButtonLogout'
                            name='ButtonLogout'
                            color="primary"
                            onClick={(e) => this.handleChangeLanguage(e, 'en')}
                        >
                            Logout
                        </Button>
                    </Col>
                </CContainer>
            </div >
        );
    }
}

export default withTranslation()(DefaultHeader);
