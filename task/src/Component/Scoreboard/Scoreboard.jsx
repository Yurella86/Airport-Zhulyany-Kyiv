import React, { useEffect, useState } from 'react';
import './Scoreboard.css'
import Item from './../Item/Item'



function Scoreboard() {

    const state = {
        direction: [],
    }

    const [direction, setDirection] = useState('departure')
    const [items, setItems] = useState()
    const [date, setDate] = useState()

    const fullNowDate = new Date()
    const todday = `${fullNowDate.getDate()}-${fullNowDate.getMonth() + 1}-${fullNowDate.getFullYear()}`

    useEffect(async () => {
        let urlDay = ''
        if (date) {
            urlDay = date
        } else {
            urlDay = todday
        }
        const response = await fetch(`https://api.iev.aero/api/flights/${urlDay}`)
        const obj = await response.json()
        const body = await obj.body
        direction == 'departure' ? state.direction = body.departure : state.direction = body.arrival
        console.log(urlDay);
        console.log(direction);
        console.log(state.direction);

        const arrayItems = state.direction.map((item) => <Item
            key={item.ID}
            time={item.timeToStand}
            directionCity={item.['airportToID.city']}
            flight={item.codeShareData[0].codeShare}
            company={item.codeShareData[0].airline.ua.name}
            status={item.['status']} />)

        setItems(arrayItems)

    }, [direction])

    return (
        <div className="scoreboard">
            <div className="search">
                <div className="icon-search"></div>
                <input placeholder="Номер рейсу або місто" />
                <input onChange={(el) => { setDate(el.target.value) }} className="data" type="date" />
                <button  >Пошук</button>
            </div>

            <div className="direction">
                <div className="departure">
                    <div className="arrow-up"></div>
                    <a href="#" onClick={() => { setDirection('departure') }} >Відправлення</a>
                </div>

                <div className="arrival">
                    <div className="arrow-down"></div>
                    <a href="#" onClick={() => { setDirection('arrival') }} >Прибуття</a>
                </div>
            </div>

            <div className="table-header">
                <div>Час</div>
                <div>Напрямок</div>
                <div>Рейс</div>
                <div>Компанія</div>
                <div>Статус</div>
            </div>
            <div className="items">
                {items}
            </div>

            <footer>Copyright © 2021</footer>

        </div>

    )

}

export default Scoreboard;