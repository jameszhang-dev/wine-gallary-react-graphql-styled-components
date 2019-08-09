import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WineQuantityQuizQuestion from './WineQuantityQuizQuestion';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <WineQuantityQuizQuestion
      handleUpdateWineQuantity={() => null}
      question="White or Red?"
      redBottles={3}
      whiteBottles={0}
      roseBottles={0}
      sparklingBottles={0}
    />
  );
});
