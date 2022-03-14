import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.returnUserName();
  }

  returnUserName = async () => {
    this.setState({
      isLoading: true,
    });
    const userName = await getUser();
    if (userName) {
      this.setState({
        name: userName.name,
        isLoading: false,
      });
    }
  };

  render() {
    const { name, isLoading } = this.state;
    return (isLoading ? <Loading /> : (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">
          { name }
        </h2>
      </header>
    )
    );
  }
}

export default Header;
