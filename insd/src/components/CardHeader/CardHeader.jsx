import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const CardHeader = ({ expanded, onExpand }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h6" fontWeight="bold">
        My Holding
      </Typography>

      <Box
        component={Paper}
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "4px 12px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <FormControl size="small">
          <Select defaultValue="Portfolio">
            <MenuItem value="Portfolio">Portfolio</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <Select defaultValue="Prior Month">
            <MenuItem value="Prior Month">Prior Month</MenuItem>
            <MenuItem value="Prior Day">Prior Day</MenuItem>
            <MenuItem value="Prior Prior Day">Prior Prior Day</MenuItem>
            <MenuItem value="Prior Qater">Prior Quater</MenuItem>
            <MenuItem value="Prior Year">Prior Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <Select defaultValue="GAAP">
            <MenuItem value="GAAP">GAAP</MenuItem>
          </Select>
        </FormControl>
        <IconButton size="small" onClick={onExpand}>
          <OpenInFullIcon />
        </IconButton>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardHeader;
