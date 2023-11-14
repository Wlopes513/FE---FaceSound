import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

class ModalRegister extends Component {
    constructor(props) {
        super(props)
        this.state = { Address: "" };
    }

    render(args) {
        const { Address } = this.state;
        const { isOpen, toggle } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>Informe os dados do usuário</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <FormGroup floating>
                                <Input value={Address} required={true} onChange={(e) => this.setState({ Address: e.target.value })} placeholder="Endereço" id="Address" />
                                <Label for="Address">Endereço</Label>
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