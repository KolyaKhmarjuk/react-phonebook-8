import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ContactsFilter({ onFilter }) {
  return (
    <Box
      sx={{
        width: 282,
        mx: 'auto',
        mt: 5,
        mb: 1,
      }}
    >
      <TextField
        sx={{ boxShadow: 3, borderRadius: '8px' }}
        size="small"
        fullWidth
        label="Enter to search"
        id="fullWidth"
        onChange={onFilter}
        color="grey"
      />
    </Box>
  );
}
