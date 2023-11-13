import React, { Component } from 'react';
import {
  CHeaderNav,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { Container, Row, Button } from 'reactstrap';
import Header from '../../containers/defaultHeader';
import { Link } from 'react-router-dom';

class Page404 extends Component {
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
            <Row className='justify-content-center'>
              <h1 className="title mt-5 mb-3">
                {t('Page404.TITLE')}
              </h1>
            </Row>
            <Row className='justify-content-center'>
              <h3 className='text-center mt-4 mb-5'>
                {t('Page404.DONT_WORRY')}
              </h3>
            </Row>
            <Row className='justify-content-center mt-3'>
              <Link to='/'>
                <Button type='button' color="info" outline>
                  {t('Page404.BACK_HOME')}
                </Button>
              </Link>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default withTranslation()(Page404);