import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

class ModalRegister extends Component {
    constructor(props) {
        super(props)
        this.state = { Name: "" };
    }

    render(args) {
        const { Name } = this.state;
        const { isOpen, toggle } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={toggle} {...args}>
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
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => { }}>
                        Cadastrar
                    </Button>{' '}
                    <Button color="danger" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withTranslation()(ModalRegister);