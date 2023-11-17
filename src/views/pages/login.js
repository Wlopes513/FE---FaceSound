import React, { Component } from 'react';
import { Container, Form, Row, Col, Input, Button, FormGroup } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Logo from '../../assets/imgs/logo.svg';
import { localSet } from '../../utils/session';
import { Navigate } from 'react-router-dom';

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { Width: window.innerWidth, Email: '', Password: '', loggedIn: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { Email, Password } = this.state;

    try {
      const response = await fetch('http://api.facesoundid.tech/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          localSet("isLogged", data.jwt_token, 15);
          this.setState({ loggedIn: true });
          toast.success("Login bem-sucedido!");
        })
        .catch(error => {
          console.error('Houve um problema com a sua requisição fetch:', error);
          toast.error("Credenciais inválidas!");
        });

      console.log(response);

    } catch (error) {
      toast.error(error.message);
    }
  }

  render() {
    const { Email, loggedIn } = this.state;

    if (loggedIn) {
      return <Navigate to="/home" />;
    }

    return (
      <div className="app-auth">
        <Container className='flex-fill d-flex flex-column justify-content-center'>
          <Form className='align-self-center' onSubmit={this.handleSubmit}>
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
                      <Input id="EmailInput" name="EmailInput" type="email" placeholder="Usuário ou email" required value={Email} onChange={(e) => this.setState({ Email: e.target.value })} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Input id="PasswordInput" name="PasswordInput" type="password" placeholder="Senha" required onChange={(e) => this.setState({ Password: e.target.value })} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Button color='primary' className='w-100' type='submit'>
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