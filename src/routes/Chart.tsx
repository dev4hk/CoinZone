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
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading..."
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
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
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
