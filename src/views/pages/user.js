import React, { Component } from 'react';
import {
    CHeaderNav,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import Header from '../../containers/defaultHeader';
import { ModalRegisterUserComponent } from '../../components/modals';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = { Width: window.innerWidth };
        this.handleModal = this.handleModal.bind(this);
    }

    handleModal(event) {
        event.preventDefault();

        const { IsOpen } = this.state;

        this.setState({ IsOpen: !IsOpen });
    }

    render() {
        const { IsOpen } = this.state;
        return (
            <div className="app">
                {IsOpen && (
                    <ModalRegisterUserComponent isOpen={IsOpen} toggle={this.handleModal} />
                )}
                <CHeaderNav>
                    <Header className="header" />
                </CHeaderNav>
                <div className="app-body">
                    <div className='container-centered'>
                        <Card>
                            <CardBody>
                                <Row className='mb-4'>
                                    <Col className='d-flex justify-content-end'>
                                        <Button type="button" color='primary' onClick={this.handleModal} id="ButtonRegister" name="ButtonRegister">Cadastrar</Button>
                                    </Col>
                                </Row>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Admin</th>
                                            <th>Criado</th>
                                            <th>Modificado</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>John Doe</td>
                                            <td>teste@gmail.com</td>
                                            <td>Jonas</td>
                                            <td>2023/11/12</td>
                                            <td>2023/11/12</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm btn-visual"
                                                    type='button'
                                                    onClick={this.handleTest}>
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm btn-visual"
                                                    type='button'
                                                    onClick={this.handleTest}>
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(User);