import { createContext } from 'react';

import { IBridgeContainerProps } from 'components/Bridge/models/BridgeContainer.types';
import { IBridge } from 'interfaces/data';

export interface IConfigContext {
  bridge?: IBridge;
  provider?: IBridgeContainerProps['provider'];
  polyjuiceProvider?: IBridgeContainerProps['provider'];
  config?: IBridgeContainerProps['config'];
}

const ConfigContext = createContext<IConfigContext>(null);

export { ConfigContext };
