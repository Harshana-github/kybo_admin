import React from "react";
import { Box, xcss,Flex } from "@atlaskit/primitives";
import ChartCard from "../../Components/ChartCard";
import PieChartComp from "../../Components/PieChart";
import OrderDetailsChart from "../../Components/OrderDetailsChart";
import OrderHistogram from "../../Components/OrderHistogram";

const boxStyles = xcss({
  backgroundColor:"color.background.input",
  borderRadius: "3px",
  borderWidth: "border.width",
  paddingTop:"space.300",
  paddingLeft:"space.200",
  width: "48%",
  '@media (max-width: 768px)': {
    width: "96%",
  },
});


const flexStyles = xcss({
  marginTop: "space.500",
});


const Dashboard = () => {
  return (
    <Flex gap="space.200" wrap="wrap" xcss={flexStyles}>
      <Box xcss={boxStyles}><ChartCard /></Box>
      <Box xcss={boxStyles}><PieChartComp /></Box>
      <Box xcss={boxStyles}><OrderDetailsChart /></Box>
      <Box xcss={boxStyles}><OrderHistogram /></Box>
    </Flex>
  );
};

export default Dashboard;
