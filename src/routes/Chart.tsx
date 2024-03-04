import { useQuery } from "react-query";
import { fetchCoinHistory } from "../services/api";
import { ICoinHistory } from "../interfaces/Interface";
import ReactApexChart from "react-apexcharts";

interface IChartProps {
  coinId: string;
}

function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<ICoinHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : !Array.isArray(data) ? (
        "Data Not Available"
      ) : (
        <ReactApexChart
          type="line"
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 500,
              width: 500,
              background: "transparent",
              toolbar: { show: false },
            },
            stroke: { curve: "smooth", width: 3 },
            grid: { show: false },
            tooltip: {
              y: {
                formatter: (value) => `$${value}`,
              },
              x: {
                show: false,
              },
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              categories: data?.map(
                (price) => new Date(price.time_close * 1000)
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
          }}
          series={[
            {
              name: "price",
              data: data?.map((price) => Number(price.close)) ?? [],
            },
          ]}
        />
      )}
    </div>
  );
}
export default Chart;
