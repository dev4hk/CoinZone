import { useQuery } from "react-query";
import { IChartProps, ICoinHistory } from "../interfaces/Interface";
import { fetchCoinHistory } from "../services/api";
import ReactApexChart from "react-apexcharts";

const PERIOD_1Y = "1y";

function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<ICoinHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId, PERIOD_1Y)
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
              enabled: true,
              y: {
                formatter: (value) => `$${value}`,
              },
              x: {
                show: true,
              },
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              crosshairs: { show: true },
              tooltip: { enabled: false },
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
