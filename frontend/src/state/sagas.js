import { saga as loginSaga } from './login';

export default function(sagaMiddleware) {
  [loginSaga].forEach(saga => sagaMiddleware.run(saga));
}
