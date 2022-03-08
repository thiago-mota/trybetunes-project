import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      enterBtnDisabled: true,
      isLoading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      name: target.value },
    () => this.setState({ enterBtnDisabled: this.btnValidation() }));
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
      redirect: true,
    });
  }

  btnValidation = () => {
    const { name } = this.state;
    const THREE = 3;
    if (name.length >= THREE) return false;
    return true;
  }

  render() {
    const { enterBtnDisabled, isLoading, redirect } = this.state;
    const { handleChange, handleClick } = this;
    if (redirect) return <Redirect to="/search" />;

    return (
      isLoading ? <Loading /> : (
        <div data-testid="page-login">
          <form>
            <label htmlFor="login-id">
              Usuário:
              <input
                id="login-id"
                data-testid="login-name-input"
                placeholder="Insira seu usuário"
                type="text"
                onChange={ handleChange }
              />
            </label>

            <button
              data-testid="login-submit-button"
              disabled={ enterBtnDisabled }
              type="button"
              onClick={ handleClick }
            >
              Entrar
            </button>
          </form>
        </div>
      )
    );
  }
}

export default Login;
