import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks';
import { authOperations } from 'redux/auth/auth-operations';
import { regModalClose, logModalOpen } from 'redux/auth/auth-slice';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: 250,
};

const RegModal = () => {
  const { isModalReg } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const hendelChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const hendelSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <Modal
        open={isModalReg}
        onClose={() => dispatch(regModalClose())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            sx={{ position: 'absolute', top: '0%', right: '0%' }}
            onClick={() => dispatch(regModalClose())}
          >
            <CloseIcon />
          </IconButton>

          <form onSubmit={hendelSubmit}>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: 24,
                color: 'rgb(70,130,180)',
              }}
            >
              LogUp
            </Typography>
            <TextField
              sx={{ boxShadow: 3, borderRadius: '8px', mb: 2, mt: 2 }}
              size="small"
              fullWidth
              type="text"
              name="name"
              value={name}
              label="Name"
              required
              onChange={hendelChange}
              color="grey"
            />

            <TextField
              sx={{ boxShadow: 3, borderRadius: '8px', mb: 2 }}
              size="small"
              fullWidth
              type="text"
              name="email"
              value={email}
              label="Email"
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
              size="small"
              color="success"
              variant="contained"
              type="submit"
            >
              <Typography>Registration</Typography>
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
              Have an account?
              <Button
                size="small"
                variant="text"
                sx={{ color: 'rgb(70,130,180)' }}
                onClick={() => dispatch(logModalOpen())}
              >
                Login
              </Button>
            </Typography>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default RegModal;
