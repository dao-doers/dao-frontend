import { AbstractConnector } from '@web3-react/abstract-connector';

interface Connector<T extends AbstractConnector> {
  connector: T;
  canConnect: () => boolean;
  switchNetwork: () => Promise<void>;
}

export default Connector;
