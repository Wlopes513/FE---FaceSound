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
            const response = await fetch('https://35.199.105.38:5005/api/v1/persons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: Name,
                    cpf: CPF,
                    phone: Phone,
                    floor: Floor
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