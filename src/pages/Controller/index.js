import { useEffect, useState } from 'react';
import { Card, Col, Row, Switch, Button, notification } from "antd"
import client from '../../config/mqtt';
import TemperatureChart from '../../components/TemperatureChart';
import HumidityChart from '../../components/HumidityChart';
import RainState from '../../components/RainState';
import { updateTemp } from '../../service/temperatureService';
import { updateHum } from '../../service/humidityService';
import { CloudUploadOutlined } from "@ant-design/icons"
import { sendMail } from '../../service/notificationService';

function Controller() {
    const [temp, setTemp] = useState();
    const [hum, setHum] = useState();
    const [rain, setRain] = useState(false);
    const [ledState, setLedState] = useState(false);
    const [relayState, setRelayState] = useState(false);
    const [servoState, setServoState] = useState(false);
    const [ledAuto, setLedAuto] = useState(false);
    const [relayAuto, setRelayAuto] = useState(false);
    const [servoAuto, setServoAuto] = useState(false);
    const [loading, setLoading] = useState(false)
    const [notificationApi, contextHolder] = notification.useNotification();
    useEffect(() => {
        client.on('connect', () => {
            // Subscribe
            client.subscribe('/TranKiet', { qos: 0 })
            client.subscribe('/tranKiet/temp', { qos: 0 })
            client.subscribe('/tranKiet/hum', { qos: 0 })
            client.subscribe('/tranKiet/led', { qos: 0 })
            client.subscribe('/tranKiet/relay', { qos: 0 })
            client.subscribe('/tranKiet/servo', { qos: 0 })
            client.subscribe('/tranKiet/rain', { qos: 0 })
        })
        client.on('message', (topic, message) => {
            console.log(`Received Message: ${message.toString()} On topic: ${topic}`)
            if (topic == '/tranKiet/temp') {
                setTemp(parseFloat(message.toString()))
            }
            if (topic == '/tranKiet/hum') {
                setHum(parseFloat(message.toString()))
            }
            if (topic == '/tranKiet/led') {
                if (message.toString() == '0') {
                    setLedState(false)
                } else setLedState(true)
            }
            if (topic == '/tranKiet/relay') {
                if (message.toString() == '1') {
                    setRelayState(false)
                } else setRelayState(true)
            }
            if (topic == '/tranKiet/servo') {
                if (message.toString() == '180') {
                    setServoState(false)
                } else if (message.toString() == '0') { setServoState(true) }
            }
            if (topic == '/tranKiet/rain') {
                if (message.toString() == '1') {
                    setRain(false)
                } else setRain(true)
            }
        })
    }, [])
    const handleChangeLed = (checked) => {
        if (checked) {
            client.publish('/TranKiet', '1', { qos: 0, retain: false })
        } else {
            client.publish('/TranKiet', '0', { qos: 0, retain: false })
        }
    }
    const handleChangeAutoLed = (checked) => {
        if (checked) {
            client.publish('/TranKiet', '7', { qos: 0, retain: false })
            setLedAuto(true);
        } else {
            client.publish('/TranKiet', '6', { qos: 0, retain: false })
            setLedAuto(false)
        }
    }
    const handleChangeRelay = (checked) => {
        if (checked) {
            client.publish('/TranKiet', '3', { qos: 0, retain: false })
        } else {
            client.publish('/TranKiet', '2', { qos: 0, retain: false })
        }
    }
    const handleChangeAutoRelay = (checked) => {
        if (checked) {
            client.publish('/TranKiet', '9', { qos: 0, retain: false })
            setRelayAuto(true)
        } else {
            client.publish('/TranKiet', '8', { qos: 0, retain: false })
            setRelayAuto(false)
        }
    }
    const handleChangeServo = (checked) => {
        if (checked) {
            client.publish('/TranKiet', '4', { qos: 0, retain: false })
        } else {
            client.publish('/TranKiet', '5', { qos: 0, retain: false })
        }
    }
    const handleChangeAutoServo = (checked) => {
        if (checked) {
            client.publish('/TranKiet', 'b', { qos: 0, retain: false })
            setServoAuto(true)
        } else {
            client.publish('/TranKiet', 'a', { qos: 0, retain: false })
            setServoAuto(false)
        }
    }
    const handleClick = async () => {
        setLoading(true)
        const resTemp = await updateTemp({
            value: temp
        })
        const resHum = await updateHum({
            value: hum
        })
        if (resTemp.code===200 && resHum.code===200) {
            setLoading(false);
            notificationApi.success({
                message: "Cập nhật dữ liệu thành công",
                duration: 5
            })
        } else {
            notificationApi.error({
                message: "Cập nhật dữ liệu thất bại",
                duration: 5
            })
        }
    }
    useEffect(() => {
        const sendNotification = async () => {
            if(temp >= 45){
                await sendMail()
            }
        }
        sendNotification()
    }, [temp])
    return (
        <>
            {contextHolder}
            <Row gutter={[20, 20]} >
                <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                    <Card title="Máy bơm">
                        <Row gutter={[10, 10]} >
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Card title="Chế độ tự động">
                                    <Switch onChange={handleChangeAutoRelay} checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked={relayAuto} />
                                </Card>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Card title="Chế độ thường">
                                    <Switch onChange={handleChangeRelay} checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked={relayState} disabled={relayAuto} />
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                    <Card title="Mái che">
                        <Row gutter={[10, 10]} >
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Card title="Chế độ tự động">
                                    <Switch onChange={handleChangeAutoServo} checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked={servoAuto} />
                                </Card>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Card title="Chế độ thường">
                                    <Switch onChange={handleChangeServo} checkedChildren="Mở" unCheckedChildren="Đóng" defaultChecked={servoState} disabled={servoAuto} />
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                    <Card title="Đèn vườn">
                        <Row gutter={[10, 10]} >
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Card title="Chế độ tự động">
                                    <Switch onChange={handleChangeAutoLed} checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked={ledAuto} />
                                </Card>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Card title="Chế độ thường">
                                    <Switch onChange={handleChangeLed} checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked={ledState} disabled={ledAuto} />
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                {temp && (
                    <Col xxl={10} xl={10} lg={10} md={10} sm={12} xs={24}>
                        <TemperatureChart temp={temp} />
                    </Col>
                )}
                {hum && (
                    <Col xxl={10} xl={10} lg={10} md={10} sm={12} xs={24}>
                        <HumidityChart hum={hum} />
                    </Col>
                )}
                {temp && hum && (
                    <Col offset={8} xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                        <Button onClick={handleClick} loading={loading} type="primary" icon={<CloudUploadOutlined />}>Lưu dữ liệu hiện tại</Button>
                    </Col>
                )}
            </Row>

            <RainState rain={rain} />
        </>
    )
}
export default Controller