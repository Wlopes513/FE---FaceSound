/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { localGet } from '../../utils/session';
import ImageUpload from './imageUpload';

const initialState = {
  Name: '',
  CPF: '',
  Phone: '',
  Floor: '',
  UploadedImage: null,
};

const token = localGet('isLogged');

class ModalRegister extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleRegister = this.handleRegister.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
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

  async handleUploadImage(userId, imageFile) {
    try {
      const url = `http://api.facesoundid.tech/api/v1/persons/${userId}/face`;
      const responseImage = await fetch(imageFile);
      const blob = await responseImage.blob();

      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'api-token': token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro ao fazer upload da imagem: ${response.status}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async handleRegister(event) {
    event.preventDefault();

    const {
      Name, CPF, Phone, Floor, UploadedImage,
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

      if (UploadedImage) {
        await this.handleUploadImage(userData.id, UploadedImage);
      }

      toast.success(editUserId ? 'Edição bem-sucedida!' : 'Cadastro bem-sucedido!');
      toggle(event);
      onEditSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  }

  handleChangeImage(event, image) {
    event.preventDefault();

    this.setState({ UploadedImage: image });
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
          Pessoa
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
                <Input type="select" value={Floor} required onChange={(e) => this.setState({ Floor: e.target.value })} id="Floor">
                  <option value="" disabled>Selecione o Andar</option>
                  <option value="1">1° Andar</option>
                  <option value="2">2° Andar</option>
                  <option value="3">3° Andar</option>
                </Input>
                <Label for="Floor">Andar</Label>
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
          <ImageUpload changeImage={this.handleChangeImage} />
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
