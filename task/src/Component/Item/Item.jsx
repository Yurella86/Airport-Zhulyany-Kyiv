import React, { useState } from "react";
import './Item.css'

function Item({ time, directionCity, flight, company, status }) {

    let regExpTime = /(\d+:\d+)/gm
    let normalTime = time.match(regExpTime);

    let position = () => {
        switch (status) {
            case 'FR':
                return 'В польоті'
            case 'BD':
                return 'Посадка'
            case 'ON':
                return 'Вчасно'
            case 'CK':
                return 'Реєстрація'
            case 'DP':
                return 'Вилетів'
            case 'LN':
                return 'Прибув'
            case 'GC':
                return 'Посадка закінчена'
            default:
                break;
        }
        return status
    };

    return (
        <div className="item">
            <div>{normalTime}</div>
            <div>{directionCity}</div>
            <div>{flight}</div>
            <div>{company}</div>
            <div>{position()}</div>
        </div>

    )
}

export default Item;