import React, { useEffect, useState } from 'react';
import './Scoreboard.css'
import Item from './../Item/Item'
import { change } from './../../Store/action';
import { connect } from 'react-redux';


function Scoreboard({ list = [], change }) {

    const dateToday = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`

    const [direction, setDirection] = useState('departure')
    const [filter, setFilter] = useState('')
    const [items, setItems] = useState([])
    const [NewDate, setNewDate] = useState(dateToday)

    async function getScheduleRequest(date) {
        try {
            const response = await fetch(`https://api.iev.aero/api/flights/${date}`)
            const data = await response.json()
            const obj = data.body
            direction === 'departure' ? change(obj.departure) : change(obj.arrival)
        } catch (error) {
            console.log(error);
        }
    }

    function getFilter(word) {
        if (word) {
            if (direction === 'departure') {
                const arrayfilltered = list.filter(item =>
                    item['airportToID.city'].toUpperCase().includes(word.toUpperCase())
                    || item.codeShareData[0].codeShare.toUpperCase().includes(word.toUpperCase()))
                return arrayfilltered
            } else {
                const arrayfilltered = list.filter(item =>
                    item['airportFromID.city'].toUpperCase().includes(word.toUpperCase())
                    || item.codeShareData[0].codeShare.toUpperCase().includes(word.toUpperCase()))
                return arrayfilltered
            }
        } else {
            return list
        }
    };

    function pushItems() {
        const arrayFiltered = getFilter(filter)
        setItems(arrayFiltered)

    };

    function handleSearchClick() {
        getScheduleRequest(NewDate)
    }

    useEffect(() => {
        getScheduleRequest(dateToday)
    }, [])

    useEffect(() => {
        pushItems()
    }, [list])

    return (
        <div className="scoreboard">
            <div className="search">
                <div className="icon-search"></div>
                <input
                    onChange={(el) => { setFilter(el.target.value) }}
                    placeholder="Номер рейсу або місто" />
                <input
                    onChange={(el) => { setNewDate(el.target.value) }}
                    className="data"
                    type="date"
                    min="01-01-2021"
                    max="31-12-2021"
                />
                <button onClick={handleSearchClick} >Пошук</button>
            </div>
            <div className="direction">
                <div className="departure">
                    <div className="arrow-up"></div>
                    <a
                        href="#"
                        onClick={() => { setDirection('departure') }} >Відправлення</a>
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
                {items.map((item) => <Item
                    key={item.ID}
                    time={item.timeToStand}
                    directionCity={item['airportToID.city'] || item['airportFromID.city']}
                    flight={item.codeShareData[0].codeShare}
                    company={item.codeShareData[0].airline.ua.name}
                    status={item['status']} />)}
            </div>

            <footer>Copyright © 2021</footer>

        </div>

    );
};

function mapStateToProps(state) {
    return {
        list: state.direction,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        change: array => dispatch(change(array))
    };
}

const ScoreboardHOC = connect(
    mapStateToProps,
    mapDispatchToProps
);


export default ScoreboardHOC(Scoreboard);
