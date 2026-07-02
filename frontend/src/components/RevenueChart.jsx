import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function RevenueChart({ invoices }) {
  const data = invoices.reduce((acc, item) => {
    const date = item.date || "Unknown";

    const existing = acc.find((entry) => entry.date === date);

    if (existing) {
      existing.revenue += Number(item.total || 0);
    } else {
      acc.push({
        date,
        revenue: Number(item.total || 0),
      });
    }

    return acc;
  }, []);

  return (
    <div className="card revenue-chart">
      <h2>Revenue Overview</h2>

      {data.length === 0 ? (
        <p>No revenue data yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#7c3aed"
              strokeWidth={4}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default RevenueChart;