import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const OrderHistogram = () => {
  const { t: tGeneral } = useTranslation("general");

  const data = [
    { range: "0-50", count: 3 },
    { range: "51-100", count: 7 },
    { range: "101-150", count: 12 },
    { range: "151-200", count: 8 },
    { range: "201-250", count: 6 },
    { range: "251-300", count: 4 }
  ];

  return (
    <div>
      {tGeneral("dashboard.MonthlyProductSalesSummary")}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#36A2EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderHistogram;
