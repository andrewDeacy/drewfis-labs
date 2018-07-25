import * as React from 'react';
import './App.css';

import headerLogo from './header-logo.png';

class App extends React.Component {
  public render() {
    return (
      <div className="">

        <header className="app-header">
          <img src={headerLogo} className="app-logo" alt="logo" />
        </header>


      </div>
    );
  }
}

export default App;
