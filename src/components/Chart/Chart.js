import React, { useContext } from 'react';
import { HorizontalBar, Pie } from 'react-chartjs-2'
import { BillCostContext } from '../BillCostContext'
import './Chart.css'

const Chart = props => {
    const { labels, costData, billCostList } = useContext(BillCostContext)

    let chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Bill of Cost',
                data: costData,
                backgroundColor: [
                    '#C8E9D6', '#FCCE56', '#F88D09', '#1D8277', '#D43632', '#AACCCC', '#D9826D', '#C3C178', '#FB8B69', '#B99CA9', '#66756F', '#BDC863'
                ],
            }
        ]
    }

    return (
        <div className="chartContainer"  >
            <h1>總支出: $ {billCostList.reduce(
                (accumulator, billCost) => {
                    return billCost.cost + accumulator
                }, 0
            )}</h1>

            <div className="pieChart" >
                <Pie
                    data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: '圓餅圖'
                        },
                        legend: {
                            display: false,
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                    }}
                />
            </div>
            <div className="barChart" >
                <HorizontalBar
                    data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: '長條圖'
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    suggestedMax: 1000,
                                    suggestedMin: 0
                                }
                            }]
                        },
                        legend: {
                            display: false,
                        }
                    }}
                    height={260}
                />
            </div>
        </div >
    )
}

export default Chart;
