import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import ImageUpload from './imageUpload';

class ModalRegister extends Component {
    constructor(props) {
        super(props)
        this.state = { Name: "", CPF: "", Phone: "", Floor: "" };
        this.handleRegister = this.handleRegister.bind(this);
    }

    async handleRegister() {
        const { Name, CPF, Phone, Floor } = this.state;
        const { toggle } = this.props;

        try {
            const response = await fetch('http://api.facesoundid.tech/api/v1/persons/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDAyNjM0NDQsImlhdCI6MTcwMDE3NzA0NCwic3ViIjoiMDIzNzI4ZjUtNTFiYS00YjlkLTg0MGEtMzFjNGVmMzMxNWRjIn0.vgkBsneSk3FjOHyFcOebQl4o3H-2Un2kobTE-poBmYc'
                },
                body: JSON.stringify({
                    name: Name,
                    cpf: CPF,
                    phone: Phone,
                    floor: parseInt(Floor, 10)
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            console.log('Cadastro bem-sucedido!');
            toggle();
        } catch (error) {
            console.error('Erro no cadastro:', error.message);
        }
    };

    render() {
        const { CPF, Name, Phone, Floor } = this.state;
        const { isOpen, toggle } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Informe os dados do Visitante</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <FormGroup floating>
                                <Input value={Name} required={true} onChange={(e) => this.setState({ Name: e.target.value })} placeholder="Nome" id="Name" />
                                <Label for="Name">Nome</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup floating>
                                <Input value={CPF} required={true} onChange={(e) => this.setState({ CPF: e.target.value })} placeholder="CPF" id="CPF" />
                                <Label for="CPF">CPF</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup floating>
                                <Input value={Floor} required={true} onChange={(e) => this.setState({ Floor: e.target.value })} placeholder="Floor" id="Floor" />
                                <Label for="Floor">Andar°</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup floating>
                                <Input value={Phone} required={true} onChange={(e) => this.setState({ Phone: e.target.value })} placeholder="Phone" id="Phone" />
                                <Label for="Phone">Telefone</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <ImageUpload />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleRegister}>
                        Cadastrar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default withTranslation()(ModalRegister);