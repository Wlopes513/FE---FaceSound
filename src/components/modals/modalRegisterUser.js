import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

class ModalRegisterUser extends Component {
    constructor(props) {
        super(props)
        this.state = { Name: "", Email: "", Admin: "" };
    }

    render() {
        const { Email, Name, Admin } = this.state;
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
                                <Input value={Email} required={true} onChange={(e) => this.setState({ Email: e.target.value })} placeholder="Email" id="Email" />
                                <Label for="Email">Email</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup floating>
                                <Input value={Admin} required={true} onChange={(e) => this.setState({ Admin: e.target.value })} placeholder="Admin" id="Admin" />
                                <Label for="Admin">Admin</Label>
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

export default withTranslation()(ModalRegisterUser);