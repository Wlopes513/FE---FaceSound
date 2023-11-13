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
                    <Col>
                        <CHeaderBrand href="#">Header</CHeaderBrand>
                    </Col>
                    <Col className='justify-content-end'>
                        <Button
                            type='button'
                            id='ChangeLanguagePtBR'
                            name='ChangeLanguagePtBR'
                            onClick={(e) => this.handleChangeLanguage(e, 'pt-BR')}
                        >
                            <img src="https://www.gov.br/planalto/pt-br/conheca-a-presidencia/acervo/simbolos-nacionais/bandeira/bandeiragrande.jpg" alt="Bandeira do Brasil" />
                        </Button>
                        <Button
                            type='button'
                            id='ChangeLanguageEn'
                            name='ChangeLanguageEn'
                            onClick={(e) => this.handleChangeLanguage(e, 'en')}
                        >
                            <img src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/bandeira-estados-unidos.jpg" alt="Bandeira dos Estados Unidos" />
                        </Button>
                    </Col>
                </CContainer>
            </div >
        );
    }
}

export default withTranslation()(DefaultHeader);
