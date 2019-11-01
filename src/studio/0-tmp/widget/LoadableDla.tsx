import Loadable from 'react-loadable'
import Loading from './Loading'

export default function LoadableDla(opts) {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 300,
    timeout: 10000,
  }, opts))
}
