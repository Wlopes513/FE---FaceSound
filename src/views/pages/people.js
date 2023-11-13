import React, { Component } from 'react';
import {
    CHeaderNav,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import Header from '../../containers/defaultHeader';
import LogoHome from '../../assets/imgs/logo-home.svg';

class People extends Component {
    constructor(props) {
        super(props)
        this.state = { Width: window.innerWidth };
    }

    render() {
        return (
            <div className="app">
                <CHeaderNav>
                    <Header className="header" />
                </CHeaderNav>
                <div className="app-body">
                    <div className='container-centered'>
                        <table class="table">
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
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>123.456.789-01</td>
                                    <td>(123) 456-7890</td>
                                    <td>3</td>
                                    <td>2023-11-12 10:30:45</td>
                                    <td>2023-11-12 14:20:30</td>
                                    <td>
                                        <button class="btn btn-warning btn-sm">Editar</button>
                                        <button class="btn btn-danger btn-sm">Excluir</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(People);