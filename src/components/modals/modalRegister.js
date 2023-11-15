import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

class ModalRegister extends Component {
    constructor(props) {
        super(props)
        this.state = { Name: "", CPF: "", Telefone: "", Andar: ""};
    }

    render() {
        const { CPF, Name, Telefone, Andar} = this.state;
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
                        <Col>
                            <FormGroup floating>
                                <Input value={CPF} required={true} onChange={(e) => this.setState({ CPF: e.target.value })} placeholder="CPF" id="CPF" />
                                <Label for="CPF">CPF</Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup floating>
                                <Input value={Telefone} required={true} onChange={(e) => this.setState({ Telefone: e.target.value })} placeholder="Telefone" id="Telefone" />
                                <Label for="Telefone">Telefone</Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup floating>
                                <Input value={Andar} required={true} onChange={(e) => this.setState({ Andar: e.target.value })} placeholder="Andar" id="Andar" />
                                <Label for="Andar°">Andar</Label> 
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { }}>
                        Cadastrar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withTranslation()(ModalRegister);