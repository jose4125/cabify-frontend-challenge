import React from 'react';

import { CardContext } from './CardContext';
import Card from '../../components/Card';
import CardForm from '../CardForm';
import '../../styles/App.css';

const App = () => (
  <CardContext.Consumer>
    {context => (
      <div className="mainWrapper row">
        <Card info={context.state} />
        <CardForm context={context} />
      </div>
    )}
  </CardContext.Consumer>
);

export default App;
