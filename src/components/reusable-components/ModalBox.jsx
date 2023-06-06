import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  boxShadow: 24,
  padding: 32,
  width: 250,
});

export default ModalBox;
