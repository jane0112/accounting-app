import React from 'react';
import BillCost from '../BillCost/BillCost'
import Chart from '../Chart/Chart'
import './App.css'
import { BillCostProvider } from '../BillCostContext'


const App = () => {



    return (
        <div className="container">
            <div className='accountingContainer'>
                <BillCostProvider>
                    <BillCost />
                    <Chart />
                </BillCostProvider>
            </div>
        </div>
    )

}

export default App;