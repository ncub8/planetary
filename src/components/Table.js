import React from 'react';
import {PLANETARY_DAYS} from '../constants';

const TableRow = ({day, planet}) => {
    return (
        <tr>
            <td>Day</td>
            <td>Planet</td>
            <td>Time</td>
            <td>Night</td>
            <td>Planet</td>
            <td>Time</td>
        </tr>
    );

}

const Table = () => {
    const renderRows = (number) => {
        return (
            PLANETARY_DAYS.map((entry) => {<TableRow day={entry.day} planet={entry.planet} key={entry.planet}/> })
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Planet</th>
                    <th>Time</th>
                    <th>Night</th>
                    <th>Planet</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {renderRows(7)}
            </tbody>
        </table>
    );

}

export default Table;