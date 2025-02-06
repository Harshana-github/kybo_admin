import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const OrderDetailsChart = () => {
  const { t: tGeneral } = useTranslation("general");

  const data = [
    { month: tGeneral("dashboard.January"), orders: 120 },
    { month: tGeneral("dashboard.February"), orders: 98 },
    { month: tGeneral("dashboard.March"), orders: 150 },
    { month: tGeneral("dashboard.April"), orders: 130 },
    { month: tGeneral("dashboard.May"), orders: 180 },
    { month: tGeneral("dashboard.June"), orders: 200 },
    { month: tGeneral("dashboard.July"), orders: 220 },
  ];

  return (
    <div>
      {tGeneral("dashboard.MonthlyProductSalesSummary")}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="orders" stroke="#0052CC" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderDetailsChart;
