import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectIsModalLog,
  selectIsModalReg,
} from 'redux/auth/auth-selectors';

export const useAuth = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isModalLog = useSelector(selectIsModalLog);
  const isModalReg = useSelector(selectIsModalReg);

  return {
    user,
    isLoggedIn,
    isRefreshing,
    isModalLog,
    isModalReg,
  };
};
