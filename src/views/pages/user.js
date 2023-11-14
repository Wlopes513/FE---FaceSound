import React, { Component } from 'react';
import {
    CHeaderNav,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import Header from '../../containers/defaultHeader';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = { Width: window.innerWidth };
        this.handleTest = this.handleTest.bind(this);
    }

    handleTest(event) {
        event.preventDefault();

        alert("O gabriel é muito feio");
    }

    render() {
        return (
            <div className="app">
                <CHeaderNav>
                    <Header className="header" />
                </CHeaderNav>
                <div className="app-body">
                    <div className='container-centered'>
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
                                    <td>2023-11-12 10:30:45</td>
                                    <td>2023-11-12 14:20:30</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            type='button'
                                            onClick={this.handleTest}>
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            type='button'
                                            onClick={this.handleTest}>
                                            Excluir
                                        </button>
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

export default withTranslation()(User);