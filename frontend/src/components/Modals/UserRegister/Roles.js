import { Roles } from 'containers/App/constants';
import { fromJS } from 'immutable';
export const getRoleObject = () =>
  fromJS([
    { value: Roles.ADMIN, label: Roles.ADMIN },
    { value: Roles.TEACHER, label: Roles.TEACHER },
    { value: Roles.HEADMASTER, label: Roles.HEADMASTER },
    { value: Roles.MODERATOR, label: Roles.MODERATOR },
  ]);
