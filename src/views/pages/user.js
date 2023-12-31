import React, { Component } from 'react';
import {
  CHeaderNav,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import {
  Button, Card, CardBody, Col, Row, Label,
} from 'reactstrap';
import { format } from 'date-fns';
import Header from '../../containers/defaultHeader';
import { ModalRegisterUserComponent } from '../../components/modals';
import { localGet } from '../../utils/session';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { UserData: [], IsOpen: false };
    this.handleModal = this.handleModal.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.fetchUserData();
  }

  handleModal(event) {
    event.preventDefault();

    const { IsOpen } = this.state;

    this.setState({ IsOpen: !IsOpen, EditUserId: null });
  }

  handleEdit(userId) {
    this.setState({ EditUserId: userId, IsOpen: true });
  }

  handleDelete(userId) {
    const token = localGet('isLogged');

    fetch(`http://api.facesoundid.tech/api/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'api-token': token,
      },
    })
      .then(() => {
        this.fetchUserData();
      })
      .catch(() => toast.error('Erro ao excluir usuário!'));
  }

  fetchUserData() {
    const token = localGet('isLogged');

    fetch('http://api.facesoundid.tech/api/v1/users/', {
      headers: {
        'api-token': token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ UserData: data });
      })
      .catch(() => toast.error('Erro ao obter dados!'));
  }

  render() {
    const { IsOpen, UserData, EditUserId } = this.state;
    const editedUser = UserData.find((user) => user.id === EditUserId);

    return (
      <div className="app">
        {IsOpen && (
          <ModalRegisterUserComponent
            isOpen={IsOpen}
            toggle={this.handleModal}
            editUserId={EditUserId}
            editedUser={editedUser}
            onEditSuccess={() => {
              this.handleModal({ preventDefault: () => { } });
              this.fetchUserData();
            }}
          />
        )}
        <CHeaderNav>
          <Header className="header" />
        </CHeaderNav>
        <div className="app-body app-user">
          <div className="container-centered">
            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col className="d-flex justify-content-end">
                    <Button type="button" color="primary" onClick={this.handleModal} id="ButtonRegister" name="ButtonRegister">Cadastrar</Button>
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
                    {UserData.length ? (
                      UserData.map((user, index) => {
                        const createdAt = user.created_at && format(new Date(user.created_at), 'dd/MM/yyyy');
                        const updatedAt = (user.updated_at && format(new Date(user.updated_at), 'dd/MM/yyyy')) || 'Usuário nunca modificado';

                        return (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td><Label className="text-truncate" title={user.name}>{user.name}</Label></td>
                            <td><Label className="text-truncate" title={user.email}>{user.email}</Label></td>
                            <td><Label className="text-truncate" title={user.admin.toString()}>{user.admin.toString()}</Label></td>
                            <td><Label className="text-truncate" title={createdAt}>{createdAt}</Label></td>
                            <td><Label className="text-truncate" title={updatedAt}>{updatedAt}</Label></td>
                            <td>
                              <button
                                className="btn btn-warning btn-sm btn-visual"
                                type="button"
                                onClick={() => this.handleEdit(user.id)}
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-danger btn-sm btn-visual"
                                type="button"
                                onClick={() => this.handleDelete(user.id)}
                              >
                                Excluir
                              </button>
                            </td>
                          </tr>
                        );
                      })
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
    );
  }
}

export default withTranslation()(User);
