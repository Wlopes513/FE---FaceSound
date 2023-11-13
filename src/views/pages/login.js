import React, { Component } from 'react';
import { Container, Form, Row, Col, Input, Button, FormGroup } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { LanguageChangerComponent } from '../../components/utils';
import ImageFooter from '../../assets/imgs/footerImage.svg';

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { Width: window.innerWidth, Email: '', Password: '' };
  }

  render() {
    const { t } = this.props;
    const { Email } = this.state;

    return (
      <div className="app-auth">
        <Row className='m-0'>
          <Col className='d-flex justify-content-end m-3'>
            <LanguageChangerComponent />
          </Col>
        </Row>
        <Container className='flex-fill d-flex flex-column justify-content-center'>
          <Form className='w-100 align-self-center'>
            <Row>
              <Col xs={12} md={9} lg={6} className='text-center'>
                <h1 className="text-align-center mb-2">
                  {t('Auth.TITLE')}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={9} lg={6} className='text-center'>
                <h2 className='font-md mb-5'>
                  {t('Auth.SUBTITLE')}
                </h2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={9} lg={6} xl={3} className='text-center'>
                <FormGroup>
                  <Input id="EmailInput" name="EmailInput" type="email" placeholder={t('Auth.FORM.EMAIL')} value={Email} onChange={(e) => this.setState({ Email: e.target.value })} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={9} lg={6} xl={3} className='text-center'>
                <FormGroup>
                  <Input id="PasswordInput" name="PasswordInput" type="password" placeholder={t('Auth.FORM.PASSWORD')} onChange={(e) => this.setState({ Password: e.target.value })} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={9} lg={6} xl={3} className='text-center'>
                <Button type="submit" id="ButtonSubmit" name="ButtonSubmit" className='btn_web_primary w-100'>
                  {t('Auth.FORM.BUTTON_LOGIN')}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <footer>
          <img src={ImageFooter} alt="Footer" className='w-100' />
        </footer>
      </div >
    )
  }
}

export default withTranslation()(Login);