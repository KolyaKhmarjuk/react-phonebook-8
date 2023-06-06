import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, lazy } from 'react';
import Spinner from './mui/Spinner';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { authOperations } from 'redux/auth/auth-operations';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from 'hooks';
import { Layout } from './Layout';

const HomeView = lazy(() => import('../view/HomeView'));
const ContactsView = lazy(() => import('../view/ContactsView'));

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(authOperations.refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <Spinner />
  ) : (
    <Container
      sx={{
        backgroundColor: 'rgb(245,245,245)',
      }}
    >
      <Box>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeView />} />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/" component={<ContactsView />} />
              }
            />
          </Route>
        </Routes>
      </Box>
    </Container>
  );
}
