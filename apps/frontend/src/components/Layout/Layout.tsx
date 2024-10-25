import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Container } from './Layout.styled';
import { PropsWithChildren } from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import StyledLink from 'components/StyledLink/StyledLink';
import { useLocation } from 'react-router-dom';

function Layout({ children }: PropsWithChildren) {
  const location = useLocation();

  return (
    <Container>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          background: '#ffffff',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
        }}
      >
        <List>
          <ListItem disablePadding>
            <StyledLink to="/" active={location.pathname === '/'}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon
                    color={location.pathname === '/' ? 'primary' : 'action'}
                  />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </StyledLink>
          </ListItem>
          <ListItem disablePadding>
            <StyledLink
              to="/recipients"
              active={location.pathname === '/recipients'}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon
                    color={
                      location.pathname === '/recipients' ? 'primary' : 'action'
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Recipients" />
              </ListItemButton>
            </StyledLink>
          </ListItem>
        </List>
      </Box>
      {children}
    </Container>
  );
}

export default Layout;
