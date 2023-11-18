import React, { Component } from 'react';
import {
  CHeaderNav,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import Header from '../../containers/defaultHeader';
import LogoHome from '../../assets/imgs/logo-home.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="app">
        <CHeaderNav>
          <Header className="header" />
        </CHeaderNav>
        <div className="app-body">
          <div className="container-centered">
            <img src={LogoHome} alt="Logo Home" />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Home);
