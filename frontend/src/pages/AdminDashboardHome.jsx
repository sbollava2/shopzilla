import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';

const AdminDashboardHome = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Manage Products',
      description: 'Add, edit, or delete products in your store.',
      icon: <InventoryIcon fontSize="large" color="primary" />,
      path: '/admin/products',
    },
    {
      title: 'Manage Orders',
      description: 'View and manage all customer orders.',
      icon: <ListAltIcon fontSize="large" color="secondary" />,
      path: '/admin/orders',
    },
    {
      title: 'Manage Users',
      description: 'View and manage registered users.',
      icon: <PeopleIcon fontSize="large" color="success" />,
      path: '/admin/users',
    },
  ];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={3}>
        {sections.map((section, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
              <CardContent>
                {section.icon}
                <Typography variant="h6" sx={{ mt: 1 }}>{section.title}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {section.description}
                </Typography>
                <Button variant="contained" onClick={() => navigate(section.path)}>
                  Go
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboardHome;
