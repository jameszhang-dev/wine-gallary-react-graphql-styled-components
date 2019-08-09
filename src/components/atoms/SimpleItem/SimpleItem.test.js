import ReactDOM from 'react-dom';
import React from 'react';

import SimpleItem from './SimpleItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const item = { id: '1' };
  ReactDOM.render(<SimpleItem item={item} name="Simple Item" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
