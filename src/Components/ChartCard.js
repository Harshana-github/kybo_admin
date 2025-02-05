import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";


const ChartCard = () => {
  const { t: tGeneral } = useTranslation("general");
  const data = [
    { name: tGeneral("dashboard.January"), sales: 4000 },
    { name: tGeneral("dashboard.February"), sales: 3000 },
    { name: tGeneral("dashboard.March"), sales: 2000 },
    { name: tGeneral("dashboard.April"), sales: 2780 },
    { name: tGeneral("dashboard.May"), sales: 1890 },
    { name: tGeneral("dashboard.June"), sales: 2390 },
    { name: tGeneral("dashboard.July"), sales: 3490 },
  ];
  return (
    <div>
      {tGeneral('dashboard.MonthlyProductSalesSummary')}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#0052CC" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
