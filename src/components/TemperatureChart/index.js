import { Gauge } from '@ant-design/plots';

function TemperatureChart(props) {
    const { temp } = props
    const ticks = [0, 1 / 3, 2 / 3, 1];
    const color = ['#30BF78', '#FAAD14', '#F4664A'];
    const config = {
        percent: temp / 100,
        range: {
            ticks: ticks,
            color: color
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        statistic: {
            content: {
                formatter: ({ percent }) => `Nhiệt độ: ${(percent * 100).toFixed(2)}°C`,
                style: ({ percent }) => {
                    return {
                        fontSize: '24px',
                        color: percent < ticks[1] ? color[0] : percent < ticks[2] ? color[1] : color[2],
                    };
                },
            }
        },
    };
    return <Gauge {...config} />;
};
export default TemperatureChart