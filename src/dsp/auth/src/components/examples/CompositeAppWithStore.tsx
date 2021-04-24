import CompositeApp from './CompositeApp';
import { withInjectableStore } from '../../state/injectableStore'

const CompositeAppWithStore = props => withInjectableStore(CompositeApp, props.injectableStore);

export default CompositeAppWithStore;
