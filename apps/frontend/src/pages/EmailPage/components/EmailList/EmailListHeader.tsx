import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

interface TableHeaderProps {
  toggleIsOpen(): void;
}

function TableHeader({ toggleIsOpen }: TableHeaderProps) {
  return (
    <Box
      width="100%"
      display={'flex'}
      padding="15px 30px"
      justifyContent={'flex-end'}
      alignItems={'center'}
    >
      <Button
        sx={{
          width: '145px',
          height: '55px',
          background: '#5d72cc',
          color: '#fff',
        }}
        onClick={toggleIsOpen}
      >
        <AddIcon />
        Compose
      </Button>
    </Box>
  );
}

export default TableHeader;
