import React, { Component } from 'react';
import {
  CHeaderNav,
} from '@coreui/react';
import { Container } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import Header from '../../containers/defaultHeader';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { Width: window.innerWidth };
  }

  render() {
    const { t } = this.props;

    return (
      <div className="app">
        <CHeaderNav>
          <Header className="header" />
        </CHeaderNav>
        <div className="app-body">
          <Container>
            <h1 className="title">
              {t('Home.TITLE')}
            </h1>
          </Container>
        </div>
      </div>
    )
  }
}

export default withTranslation()(Home);