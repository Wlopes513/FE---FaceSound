import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row,
} from 'reactstrap';
import { toast } from 'react-toastify';
import ImageUpload from './imageUpload';

const initialState = {
  Name: '',
  CPF: '',
  Phone: '',
  Floor: '',
};

const token = localGet('isLogged');

async function uploadImage(userId, imageBase64) {
  try {
    const url = `http://api.facesoundid.tech/api/v1/persons/${userId}/upload-image`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-token': token,
      },
      body: JSON.stringify({
        image: imageBase64,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao fazer upload da imagem: ${response.status}`);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

class ModalRegister extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    const { editedUser } = this.props;

    if (editedUser) {
      const {
        name, cpf, phone, floor,
      } = editedUser;
      this.setState({
        Name: name || '',
        CPF: cpf || '',
        Phone: phone || '',
        Floor: floor || '',
      });
    } else {
      this.setState(initialState);
    }
  }

  async handleRegister(event) {
    event.preventDefault();

    const {
      Name, CPF, Phone, Floor,
    } = this.state;
    const { toggle, editUserId, onEditSuccess } = this.props;

    try {
      const method = editUserId ? 'PUT' : 'POST';
      const url = editUserId ? `http://api.facesoundid.tech/api/v1/persons/${editUserId}` : 'http://api.facesoundid.tech/api/v1/persons/';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'api-token': token,
        },
        body: JSON.stringify({
          name: Name,
          cpf: CPF,
          phone: Phone,
          floor: parseInt(Floor, 10),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const userData = await response.json();

      if (this.imageCaptureRef && this.imageCaptureRef.hasImage()) {
        const imageBase64 = this.imageCaptureRef.getImageData();
        await uploadImage(userData.id, imageBase64);
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
      CPF, Name, Phone, Floor,
    } = this.state;
    const { isOpen, toggle, editedUser } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {editedUser ? 'Editar ' : 'Cadastrar '}
          Visitante
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
                <Input value={CPF} required onChange={(e) => this.setState({ CPF: e.target.value })} placeholder="CPF" id="CPF" />
                <Label for="CPF">CPF</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup floating>
                <Input value={Floor} required onChange={(e) => this.setState({ Floor: e.target.value })} placeholder="Floor" id="Floor" />
                <Label for="Floor">Andar°</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup floating>
                <Input value={Phone} required onChange={(e) => this.setState({ Phone: e.target.value })} placeholder="Phone" id="Phone" />
                <Label for="Phone">Telefone</Label>
              </FormGroup>
            </Col>
          </Row>
          <ImageUpload ref={(ref) => {
            this.imageCaptureRef = ref;
            return null;
          }}
          />
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

export default withTranslation()(ModalRegister);
