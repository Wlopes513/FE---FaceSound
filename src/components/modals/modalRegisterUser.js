import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

const initialState = {
    Name: "",
    Email: "",
    Admin: "",
    Password: ""
}

class ModalRegisterUser extends Component {
    constructor(props) {
        super(props)
        this.state = { Name: "", Email: "", Admin: "", Password: "" };
        this.handleRegister = this.handleRegister.bind(this);
    }

    async handleRegister(event) {
        event.preventDefault();

        const { Name, Email, Admin, Password } = this.state;
        const { toggle } = this.props;

        try {
            const response = await fetch('http://api.facesoundid.tech/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDAzMjEwNjcsImlhdCI6MTcwMDIzNDY2Nywic3ViIjoiMDIzNzI4ZjUtNTFiYS00YjlkLTg0MGEtMzFjNGVmMzMxNWRjIn0.7O4BfZNQzLYka4RKBhtoQSzaaQCBDlEMvHDwi9ejo5o'
                },
                body: JSON.stringify({
                    name: Name,
                    email: Email,
                    admin: Admin,
                    password: Password
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            toast.success("Cadastro bem-sucedido!");
            this.setState(initialState);
            toggle(event);
        } catch (error) {
            toast.error(error.message);
        }
    };

    render() {
        const { Email, Name, Admin, Password } = this.state;
        const { isOpen, toggle } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Informe os dados do usuario</ModalHeader>
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
                    <Row>
                        <Col>
                            <FormGroup floating>
                                <Input value={Password} required={true} onChange={(e) => this.setState({ Password: e.target.value })} placeholder="Password" id="Password" />
                                <Label for="Password">Senha</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleRegister}>
                        Cadastrar
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withTranslation()(ModalRegisterUser);