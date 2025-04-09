import { Grid, Paper, Typography, Box } from "@mui/material";

const DashboardPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Welcome to Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1">Total Users</Typography>
            <Typography variant="h4" fontWeight="bold">
              1,234
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1">Total Products</Typography>
            <Typography variant="h4" fontWeight="bold">
              567
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1">Total Orders</Typography>
            <Typography variant="h4" fontWeight="bold">
              890
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
