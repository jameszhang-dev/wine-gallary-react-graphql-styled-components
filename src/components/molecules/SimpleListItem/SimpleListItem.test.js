import ReactDOM from 'react-dom';
import React from 'react';

import SimpleListItem from './SimpleListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const data = {
    allWines: [{ id: '1' }, { id: '2' }],
  };

  ReactDOM.render(<SimpleListItem data={data} name="Simple List Item" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
