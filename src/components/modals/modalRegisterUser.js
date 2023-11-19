import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row,
} from 'reactstrap';
import { localGet } from '../../utils/session';

const initialState = {
  Name: '',
  Email: '',
  Admin: '',
  Password: '',
};

const token = localGet('isLogged');

class ModalRegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    const { editedUser } = this.props;

    if (editedUser) {
      const {
        name, email, admin, password,
      } = editedUser;
      this.setState({
        Name: name || '',
        Email: email || '',
        Admin: admin || '',
        Password: password || '',
      });
    } else {
      this.setState(initialState);
    }
  }

  async handleRegister(event) {
    event.preventDefault();

    const {
      Name, Email, Admin, Password,
    } = this.state;
    const { toggle, editUserId, onEditSuccess } = this.props;

    try {
      const method = editUserId ? 'PUT' : 'POST';
      const url = editUserId ? `http://api.facesoundid.tech/api/v1/users/${editUserId}` : 'http://api.facesoundid.tech/api/v1/users/';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'api-token': token,
        },
        body: JSON.stringify({
          name: Name,
          email: Email,
          admin: Admin,
          password: Password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      toast.success(editUserId ? 'Edição bem-sucedida!' : 'Cadastro bem-sucedido!');
      toggle(event);
      onEditSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  }

  render() {
    const {
      Email, Name, Admin, Password,
    } = this.state;
    const { isOpen, toggle, editedUser } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {editedUser ? 'Editar ' : 'Cadastrar '}
          Usuário
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup floating>
                <Input value={Name} required onChange={(e) => this.setState({ Name: e.target.value })} placeholder="Nome" id="Name" />
                <Label for="Name">Nome</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup floating>
                <Input value={Email} required onChange={(e) => this.setState({ Email: e.target.value })} placeholder="Email" id="Email" />
                <Label for="Email">Email</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup tag="fieldset">
                <legend>Admin</legend>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="admin"
                      value={Admin === 'false'}
                      checked={Admin === 'true'}
                      onClick={(e) => {
                        this.setState({ Admin: e.target.value });
                      }}
                    />
                    Sim
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="admin"
                      value={Admin === 'false'}
                      checked={Admin === 'false'}
                      onClick={(e) => {
                        this.setState({ Admin: e.target.value });
                      }}
                    />
                    Não
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup floating>
                <Input value={Password} required onChange={(e) => this.setState({ Password: e.target.value })} placeholder="Password" id="Password" />
                <Label for="Password">Senha</Label>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleRegister}>
            {editedUser ? 'Salvar' : 'Cadastrar'}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default withTranslation()(ModalRegisterUser);
