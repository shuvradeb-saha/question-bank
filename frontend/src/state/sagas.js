import { saga as loginSaga } from './login';
import { saga as adminSaga } from './admin';
import { saga as headmasterSaga } from './headmaster';

export default function(sagaMiddleware) {
  [loginSaga, adminSaga, headmasterSaga].forEach(saga =>
    sagaMiddleware.run(saga)
  );
}
