import { Box } from '@mui/material';
import { Container } from './RecipientsPage.styled';
import RecipientList from './components/RecipientslList/RecipientsTable/RecipientsList';

function RecipientsPage() {
  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          background: '#ffffff',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
        }}
      >
        <RecipientList />
      </Box>
    </Container>
  );
}

export default RecipientsPage;
