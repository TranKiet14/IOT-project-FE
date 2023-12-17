import { Card, Col, Row, Image, Input } from "antd"
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons"
import "./Weather.scss"
import { useState } from "react";
import { getWeatherCurrent, getWeatherForecast } from "../../service/weatherService";
import { convertDate } from "../../helpers/convertDate";
import { convertTime } from "../../helpers/convertTime";
const { Search } = Input;
function Weathers() {
    const [data, setData] = useState()
    const [date, setDate] = useState()
    const [timeRise, setTimeRise] = useState()
    const [timeSet, setTimeSet] = useState()
    const [hourlyForecast, setHourlyForecast] = useState([])
    const [dailyForecast, setDailyForecast] = useState([])
    const onSearch = async (value) => {
        const res = await getWeatherCurrent(value)
        if (res) {
            setData(res)
            setDate(convertDate(res.dt))
            setTimeRise(convertTime(res.sys.sunrise))
            setTimeSet(convertTime(res.sys.sunset))
        }
        const resForeCast = await getWeatherForecast(value)
        if (resForeCast) {
            let hourly = []
            for (let i = 0; i < 8; i++) {
                hourly.push({
                    time: convertTime(resForeCast.list[i].dt),
                    icon: resForeCast.list[i].weather[0].icon,
                    temp: resForeCast.list[i].main.temp.toFixed(0)
                })
            }
            setHourlyForecast(hourly)
            let daily = []
            for (const item of resForeCast.list) {
                if (!daily.find(value => value.date === item.dt_txt.split(" ")[0])) {
                    daily.push({
                        time: convertDate(item.dt),
                        icon: item.weather[0].icon,
                        date: item.dt_txt.split(" ")[0],
                        temp: item.main.temp.toFixed(0)
                    })
                }
            }
            setDailyForecast(daily)
        }
    }
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col offset={4} span={16}>
                    <Search placeholder="Nhập tên thành phố của bạn" onSearch={onSearch} enterButton />
                </Col>
                <Col span={6}>
                    <Card title="Hiện tại" >
                        <Row gutter={[15, 15]}>
                            <Col span={12}>
                                {data && (
                                    <div className="temperature">
                                        {data.main.temp.toFixed(0)}°<sup className="temperature__unit">C</sup>
                                    </div>
                                )}
                                {data && (
                                    <div>
                                        {data.weather[0].description}
                                    </div>
                                )}
                            </Col>
                            <Col span={12}>
                                {data && (
                                    <Image preview={false} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
                                )}
                            </Col>
                            <Col span={24}>
                                {date && (
                                    <div><CalendarOutlined />  {date}</div>
                                )}
                                {data && (
                                    <div><EnvironmentOutlined />  {data.name}</div>
                                )}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={18}>
                    <Card title="Thông tin thời tiết nổi bật" >
                        <Row gutter={[20, 20]}>
                            <Col span={6}>
                                <Card size="small" title="Humidity">
                                    <div className="box">
                                        <div className="box__icon">
                                            <Image height={40} preview={false} src="https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-humidity-water-vapor-droplet-moisture-png-image_4806300.png" />
                                        </div>
                                        {data && (
                                            <div className="box__content">{data.main.humidity}%</div>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card size="small" title="Pressure">
                                    <div className="box">
                                        <div className="box__icon">
                                            <Image height={40} preview={false} src="https://th.bing.com/th/id/OIP.qSjYADHZVlKoB_w6mDUH6wHaHa?w=1600&h=1600&rs=1&pid=ImgDetMain" />
                                        </div>
                                        {data && (
                                            <div className="box__content">{data.main.pressure}hPa</div>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card size="small" title="Visibility">
                                    <div className="box">
                                        <div className="box__icon">
                                            <Image height={40} preview={false} src="https://th.bing.com/th/id/OIP.wcuniALCrW6eOZHyMv3YdgHaHa?rs=1&pid=ImgDetMain" />
                                        </div>
                                        {data && (
                                            <div className="box__content">{data.visibility / 1000}km</div>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card size="small" title="Feels Like">
                                    <div className="box">
                                        <div className="box__icon">
                                            <Image height={40} preview={false} src="https://th.bing.com/th/id/OIP.3gXoxHfGDRX9hHcI88Ps7QAAAA?rs=1&pid=ImgDetMain" />
                                        </div>
                                        {data && (
                                            <div className="box__content">{data.main.feels_like.toFixed(0)}°</div>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                            <Col offset={6} span={12}>
                                <Card title="Sunrise & Sunset" size="small">
                                    <Row gutter={[20]}>
                                        <Col span={12}>
                                            <div className="box">
                                                <div className="box__icon">
                                                    <Image height={40} preview={false} src="https://th.bing.com/th/id/OIP.DPU3emY5zTkp5kavA7rIzwHaHa?rs=1&pid=ImgDetMain" />
                                                </div>
                                                {timeRise && (
                                                    <div className="box__content">{timeRise}</div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div className="box">
                                                <div className="box__icon">
                                                    <Image height={80} preview={false} src="https://smoothwebsites.net/wp-content/uploads/2020/09/iconfinder_moon-black_110831.png" />
                                                </div>
                                                {timeSet && (
                                                    <div className="box__content">{timeSet}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" title="Dự báo thời tiết trong 6 ngày tới" >
                        {(dailyForecast || []).map((item, index) => (
                            <Row key={index}>
                                <Col span={6}>
                                    <Row>
                                        <Col span={16}>
                                            <Image preview={false} src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} />
                                        </Col>
                                        <Col span={8}>
                                            <div className="temperature__forecast">
                                                {item.temp}°
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={18}>
                                    <div className="temperature__des">
                                        {item.time}
                                    </div>
                                </Col>
                            </Row>
                        ))}
                    </Card>
                </Col>
                <Col span={18}>
                    <Card size="small" title="Dự báo thời tiết trong 24 giờ tới" >
                        <Row gutter={[10, 10]}>
                            {(hourlyForecast || []).map((item, index) => (
                                <Col key={index} span={3}>
                                    <div className="temperature__today">
                                        <div className="temperature__forecast">{item.time}</div>
                                        <Image preview={false} src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} />
                                        <div className="temperature__forecast">{item.temp}°</div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Weathers