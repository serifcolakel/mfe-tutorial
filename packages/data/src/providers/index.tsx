import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

export default function DataLayerProviders({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
