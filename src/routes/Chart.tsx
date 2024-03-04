import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTicker } from "../services/api";
import { ICoinHistory } from "../interfaces/Interface";
import ReactApexChart from "react-apexcharts";

interface IChartProps {
  coinId: string;
}

const PERIOD_1D = "1d";
const PERIOD_1M = "1m";
const PERIOD_1Y = "1y";

function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<ICoinHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId, PERIOD_1Y)
  );
  console.log(data);
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
              categories: data?.map((item) => item.timestamp),
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
              data: data?.map((price) => price.price),
            },
          ]}
        />
      )}
    </div>
  );
}
export default Chart;
