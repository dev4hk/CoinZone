import { useRecoilValue } from "recoil";
import { IChartProps } from "../interfaces/Interface";
import ReactApexChart from "react-apexcharts";
import { isDarkAtom } from "../atom";

function Chart({ data }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {data.length === 0 ? (
        "Data Not Available"
      ) : (
        <ReactApexChart
          type="line"
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              background: "transparent",
              toolbar: {
                tools: {
                  download: false,
                },
              },
            },
            stroke: { curve: "smooth", width: 3 },
            tooltip: {
              enabled: true,
              y: {
                formatter: (value) => `$${value}`,
              },
              x: {
                show: true,
              },
            },
            grid: {
              borderColor: isDark ? "white" : "black",
            },
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
            responsive: [
              {
                breakpoint: 720,
                options: {
                  grid: {
                    show: false,
                  },
                  yaxis: {
                    show: false,
                  },
                },
              },
            ],
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
