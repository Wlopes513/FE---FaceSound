/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  CContainer, CHeaderBrand,
} from '@coreui/react';
import { Col, Button } from 'reactstrap';
import { localRemove } from '../utils/session';

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();

    localRemove('isLogged');

    window.open('/login', '_self');
  }

  render() {
    return (
      <div className="app-header">
        <CContainer fluid>
          <Col className="justify-content-center">
            <CHeaderBrand href="/home">Home Page</CHeaderBrand>
          </Col>
          <Col className="justify-content-center">
            <CHeaderBrand href="/people">Pessoa</CHeaderBrand>
          </Col>
          <Col className="justify-content-center">
            <CHeaderBrand href="/user">Usuários</CHeaderBrand>
          </Col>
          <Col className="justify-content-end">
            <Button
              type="button"
              id="ButtonLogout"
              name="ButtonLogout"
              color="primary"
              onClick={this.handleLogout}
            >
              Logout
            </Button>
          </Col>
        </CContainer>
      </div>
    );
  }
}

export default withTranslation()(DefaultHeader);
