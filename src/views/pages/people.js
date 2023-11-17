import React, { Component } from 'react';
import {
    CHeaderNav,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import Header from '../../containers/defaultHeader';
import { ModalRegisterComponent } from '../../components/modals';
import { format } from 'date-fns';
import { localGet } from '../../utils/session';

class People extends Component {
    constructor(props) {
        super(props)
        this.state = { Width: window.innerWidth, userData: [], IsOpen: false };
        this.handleModal = this.handleModal.bind(this);
        this.fetchUserData = this.fetchUserData.bind(this);
    }
    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData() {
        const token = localGet("isLogged");

        fetch('http://api.facesoundid.tech/api/v1/persons/', {
            headers: {
                'api-token': token
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ userData: data });
            })
            .catch(error => console.error('Erro ao obter dados:', error));
    }

    handleModal(event) {
        event.preventDefault();

        const { IsOpen } = this.state;

        this.setState({ IsOpen: !IsOpen });
    }

    render() {
        const { IsOpen, userData } = this.state;

        return (
            <div className="app">
                {IsOpen && (
                    <ModalRegisterComponent isOpen={IsOpen} toggle={this.handleModal} />
                )}
                <CHeaderNav>
                    <Header className="header" />
                </CHeaderNav>
                <div className="app-body app-people">
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
                                            <th>CPF</th>
                                            <th>Telefone</th>
                                            <th>Andar</th>
                                            <th>Criado</th>
                                            <th>Modificado</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.length ? (
                                            userData.map(user => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.cpf}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.floor}</td>
                                                    <td>{user.created_at && format(new Date(user.created_at), 'dd/MM/yyyy')}</td>
                                                    <td>{user.updated_at && format(new Date(user.updated_at), 'dd/MM/yyyy')}</td>
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
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7">Sem dados disponíveis</td>
                                            </tr>
                                        )}
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

export default withTranslation()(People);