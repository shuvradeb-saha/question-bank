import { saga as loginSaga } from './login';
import { saga as adminSaga } from './admin';
import { saga as headmasterSaga } from './headmaster';
import { saga as questionSaga } from './question';

export default function(sagaMiddleware) {
  [loginSaga, adminSaga, headmasterSaga, questionSaga].forEach(saga =>
    sagaMiddleware.run(saga)
  );
}
