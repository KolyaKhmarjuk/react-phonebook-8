import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth/auth-operations';
import {
  logModalOpen,
  logModalClose,
  regModalOpen,
} from 'redux/auth/auth-slice';
import { useAuth } from 'hooks';
import RegModal from 'components/UserMenu/auth/RegModal';

import ModalBox from 'components/reusable-components/ModalBox';

import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LogModal = () => {
  const { isModalLog } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const hendelChange = e => {
    const { name } = e.target;

    switch (name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        return;
    }
  };

  const hendelSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <Button
        sx={{ backgroundColor: 'rgb(70,130,180)' }}
        size="small"
        variant="contained"
        endIcon={<LoginIcon />}
        onClick={() => dispatch(logModalOpen())}
      >
        Login
      </Button>
      <Modal
        open={isModalLog}
        onClose={() => dispatch(logModalClose())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <IconButton
            sx={{ position: 'absolute', top: '0%', right: '0%' }}
            onClick={() => dispatch(logModalClose())}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ textAlign: 'center', fontSize: 24, color: 'rgb(70,130,180)' }}
          >
            Login
          </Typography>

          <form onSubmit={hendelSubmit}>
            <TextField
              sx={{ boxShadow: 3, borderRadius: '8px', mb: 2, mt: 2 }}
              size="small"
              fullWidth
              type="text"
              name="email"
              value={email}
              label="Name"
              required
              onChange={hendelChange}
              color="grey"
            />

            <FormControl
              sx={{ boxShadow: 3, borderRadius: '8px', mb: 2 }}
              variant="outlined"
              color="grey"
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                required
                name="password"
                value={password}
                onChange={hendelChange}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              sx={{
                boxShadow: 3,
                borderRadius: '8px',
                border: 0,
                mt: 2,
                width: 150,
                display: 'flex',
                mx: 'auto',
              }}
              color="success"
              variant="contained"
              size="small"
              type="submit"
            >
              <Typography>Login</Typography>
            </Button>
            <Typography
              sx={{
                mt: 2,
                fontSize: 14,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              No account yet?
              <Button
                sx={{ color: 'rgb(70,130,180)' }}
                size="small"
                variant="text"
                onClick={() => dispatch(regModalOpen())}
              >
                Registration
              </Button>
            </Typography>
          </form>
        </ModalBox>
      </Modal>
      <RegModal />
    </div>
  );
};

export default LogModal;
