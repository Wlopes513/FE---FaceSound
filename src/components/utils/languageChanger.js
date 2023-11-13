import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class LanguageChanger extends Component {
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
        const { t } = this.props;

        return (
            <UncontrolledDropdown>
                <DropdownToggle>{t('LngChanger.CHANGE')}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={(e) => this.handleChangeLanguage(e, 'pt-BR')} className='rounded-0'>
                        {t('LngChanger.PORTUGUESE')}
                    </DropdownItem>
                    <DropdownItem onClick={(e) => this.handleChangeLanguage(e, 'en')} className='rounded-0'>
                        {t('LngChanger.ENGLISH')}
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}

export default withTranslation()(LanguageChanger);
