import './App.css';
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';

function transactionOrientation(txn) {
    let res = [];
    for (let key in txn) {
        res.push(
            <div>
                <p className="text__dialog">
                    <i>{key}</i> : {txn[key]}
                </p>
            </div>
        )
    }
    return (
        res
    )
}

export default transactionOrientation;