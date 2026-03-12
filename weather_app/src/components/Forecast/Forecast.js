import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import './Forecast.css'
//array for storing days of week
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


const Forecast = ({ data }) => {
    //variable to store the current date
    const currentDate = new Date().getDay();

    //append the previous days to the days array and store in a variable
    const foreCastDate = days.slice(currentDate, days.length).concat(days.slice(0, currentDate));
    console.log(foreCastDate);

    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`} />
                                    <label className="day">{foreCastDate[idx]}</label>
                                    <label className="description">{item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}</label>
                                    <label className="min-max">{Math.round(item.main.temp_min)} °C/{" "} {Math.round(item.main.temp_max)} °C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Pressure</label>
                                    <label>{item.main.pressure}hPa</label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label>Wind Speed:</label>
                                    <label>{item.wind.speed}m/s</label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label>Sea Level:</label>
                                    <label>{item.main.sea_level}m</label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label>Feels Like:</label>
                                    <label>{Math.round(item.main.feels_like)}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>

                ))}

            </Accordion>
        </>
    )
}

export default Forecast;