import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell
} from "recharts";

const COLORS = ["#0052CC", "#FF5733", "#FFC300", "#36A2EB", "#FF6384", "#4CAF50", "#8E44AD"];

const PieChartComp = () => {
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
      {tGeneral("dashboard.MonthlyProductSalesSummary")}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="sales"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComp;
