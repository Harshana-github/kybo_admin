import React from "react";
import { Box, xcss } from "@atlaskit/primitives";
import ChartCard from "../../Components/ChartCard";

const boxStyles = xcss({
  backgroundColor:"color.background.input",
  borderRadius: "3px",
  borderWidth: "border.width",
  marginTop: "space.500",
  marginBottom: "space.500",
  paddingTop:"space.300",
  paddingLeft:"space.200",
  width:"50%"
});

const Dashboard = () => {
  return (
    <Box>
      <Box xcss={boxStyles}><ChartCard /></Box>
    </Box>
  );
};

export default Dashboard;
