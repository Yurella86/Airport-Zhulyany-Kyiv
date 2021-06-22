import React, { useEffect, useState } from 'react';
import './Scoreboard.css'
import Item from './../Item/Item'
import { change } from './../../Store/store';
import { connect } from 'react-redux';


function Scoreboard(props) {


    const todday = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`

    const [direction, setDirection] = useState('departure')
    const [filter, setFilter] = useState()
    const [items, setItems] = useState()
    const [NewDate, setNewDate] = useState(`${todday}`)

    function getFilter(word) {
        if (word) {
            if (direction === 'departure') {
                const arrayfilltered = props.list.filter(item =>
                    item.['airportToID.city'].toUpperCase().includes(word.toUpperCase())
                    || item.codeShareData[0].codeShare.toUpperCase().includes(word.toUpperCase()))
                return arrayfilltered
            } else {
                const arrayfilltered = props.list.filter(item =>
                    item.['airportFromID.city'].toUpperCase().includes(word.toUpperCase())
                    || item.codeShareData[0].codeShare.toUpperCase().includes(word.toUpperCase()))
                return arrayfilltered
            }
        } else {
            return props.list
        }
    };

    function pushItems() {

        const arrayFiltered = getFilter(filter)

        const arraylist = arrayFiltered.map((item) => <Item
            key={item.ID}
            time={item.timeToStand}
            directionCity={item.['airportToID.city'] || item.['airportFromID.city']}
            flight={item.codeShareData[0].codeShare}
            company={item.codeShareData[0].airline.ua.name}
            status={item.['status']} />)
        setItems(arraylist)

        props.change(items)

    };

    function getScheduleRequest(date) {
        fetch(`https://api.iev.aero/api/flights/${date}`)
            .then(response => response.json())
            .then(obj => obj.body)
            .then((body) => {
                direction === 'departure' ? props.change(body.departure) : props.change(body.arrival)
                pushItems()
            })
    }

    function handleSearchClick() {
        getScheduleRequest(NewDate)
    }

    useEffect(() => {
        getScheduleRequest(todday)
    }, [])
    return (
        <div className="scoreboard">
            <div className="search">
                <div className="icon-search"></div>
                <input onChange={(el) => { setFilter(el.target.value) }} placeholder="Номер рейсу або місто" />
                <input onChange={(el) => { setNewDate(el.target.value) }} className="data" type="date" />
                <button onClick={handleSearchClick} >Пошук</button>
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

    );
};

function mapStateToProps(state) {
    return {
        store: state,
        list: state.direction[0],
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
