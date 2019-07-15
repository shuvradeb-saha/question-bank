import { saga as loginSaga } from './login';
import { saga as adminSaga } from './admin';

export default function(sagaMiddleware) {
  [loginSaga, adminSaga].forEach(saga => sagaMiddleware.run(saga));
}
