
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#6658e8",
  "#11b98a",
  "#ff6584",
  "#ffb547",
  "#3b9df8",
  "#ad68e8",
  "#23b8c6",
];

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function FinanceCharts({ transactions = [] }) {
  const expenses = transactions.filter(
    (t) => t.type?.toLowerCase() === "expense"
  );

  const categoryTotals = Object.values(
    expenses.reduce((result, t) => {
      const category = t.category?.trim() || "Other";
      result[category] ??= { name: category, value: 0 };
      result[category].value += Number(t.amount) || 0;
      return result;
    }, {})
  );

  const totalIncome = transactions
    .filter((t) => t.type?.toLowerCase() === "income")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalExpenses = expenses.reduce(
    (sum, t) => sum + (Number(t.amount) || 0),
    0
  );

  const comparison = [
    { name: "Income", amount: totalIncome },
    { name: "Expenses", amount: totalExpenses },
  ];

  return (
    <div className="charts-grid">
      <section className="chart-panel">
        <h2>Income vs Expenses</h2>
        <p className="chart-subtitle">
          Compare your recorded income and spending
        </p>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={comparison}
              margin={{ top: 10, right: 8, left: 8, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eeeef7"
              />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip formatter={(value) => money(value)} />
              <Bar
                dataKey="amount"
                radius={[8, 8, 0, 0]}
                maxBarSize={75}
              >
                {comparison.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={index === 0 ? "#6658e8" : "#ff6584"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="chart-panel">
        <h2>Expense Breakdown</h2>
        <p className="chart-subtitle">
          See where your money is going
        </p>

        <div className="chart-container">
          {categoryTotals.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryTotals}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {categoryTotals.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => money(value)} />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="empty">
              Add expense transactions to see your chart.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
