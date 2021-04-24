import HostApp from './HostApp';
import { withInjectableStore } from '../redux/injectableStore'

const HostAppWithStore = props => withInjectableStore(HostApp, props.injectableStore);

export default HostAppWithStore;
