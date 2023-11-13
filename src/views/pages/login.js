import React, { Component } from 'react';
import { Container, Form, Row, Col, Input, Button, FormGroup } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import Logo from '../../assets/imgs/logo.svg';

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { Width: window.innerWidth, Email: '', Password: '' };
  }

  render() {
    const { Email } = this.state;

    return (
      <div className="app-auth">
        <Container className='flex-fill d-flex flex-column justify-content-center'>
          <Form className='align-self-center'>
            <Row className='container-form'>
              <Col xs="9">
                <div className='h-100 d-flex justify-content-center align-self-center'>
                  <img src={Logo} alt="Logo Face Sound ID" />
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <h3>Entrar</h3>
                </div>
                <Row>
                  <Col>
                    <FormGroup>
                      <Input id="EmailInput" name="EmailInput" type="email" placeholder="Usuário ou email" value={Email} onChange={(e) => this.setState({ Email: e.target.value })} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Input id="PasswordInput" name="PasswordInput" type="password" placeholder="Senha" onChange={(e) => this.setState({ Password: e.target.value })} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Button color='primary' className='w-100'>
                        ENTRAR
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Container>
      </div >
    )
  }
}

export default withTranslation()(Login);