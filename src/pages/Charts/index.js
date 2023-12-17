import { useEffect, useState } from "react"
import { getTemperatures } from "../../service/temperatureService";
import { getHumidities } from "../../service/humidityService";
import { Card, Col, Row } from "antd"
import { Line } from "@ant-design/plots"
import TemperatureChart from "../../components/TemperatureChart"
import HumidityChart from "../../components/HumidityChart"
function Charts() {
    const [temperatures, setTemperatures] = useState([]);
    const [humidities, setHumidities] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getTemperatures();
            if (res) {
                let result = []
                for (const item of res) {
                    result.push({
                        time: item.createdAt,
                        value: item.value
                    })
                }
                setTemperatures(result)
            }
        }
        fetchApi()
    }, [])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getHumidities();
            if (res) {
                let result = []
                for (const item of res) {
                    result.push({
                        time: item.createdAt,
                        value: item.value
                    })
                }
                setHumidities(result)
            }
        }
        fetchApi()
    }, [])
    const configTemp = {
        data: temperatures,
        xField: 'time',
        yField: 'value',
        smooth: true
    }
    const configHum = {
        data: humidities,
        xField: 'time',
        yField: 'value',
        smooth: true
    }
    
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Card title="Nhiệt độ">
                        <Line {...configTemp} />
                    </Card>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Card title="Độ ẩm">
                        <Line {...configHum} />
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Charts