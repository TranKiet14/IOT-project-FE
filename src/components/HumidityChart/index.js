import { Liquid } from '@ant-design/plots';

function HumidityChart(props) {
    const {hum} = props
    const config = {
        percent: hum/100,
        outline: {
            border: 4,
            distance: 4,
        },
        wave: {
            length: 128,
        },
        statistic: {
            content: {
                formatter: ({ percent }) => `Độ ẩm: ${(percent*100).toFixed(2)}%`,
            },
        },
    };
    return <Liquid {...config} />;
};
export default HumidityChart