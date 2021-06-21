import React, { useState } from "react";
import './Item.css'

function Item(props) {
    const { time, directionCity, flight, company, status } = props

    let regExpTime = /(\d+:\d+)/gm
    let normalTime = time.match(regExpTime);

    let position = () => {
        switch (status) {
            case 'FP':
                return 'В польоті'
                break;
            case 'ON':
                return 'Вчасно'
                break;
            case 'CK':
                return 'Реєстрація'
                break;
            case 'DP':
                return 'Вилетів'
                break;
            case 'LN':
                return 'Прибув'
                break;
            case 'GC':
                return 'Посадка закінчена'
                break;
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