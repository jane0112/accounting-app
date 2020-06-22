import React, { useState, createContext, useEffect } from 'react';


const BillCostContext = createContext();
const BillCostProvider = ({ children }) => {

    const [billCostList, setBillCostList] = useState([]);
    // ChartData
    const [labels, setLabels] = useState(["早餐", "午餐", "晚餐", "零食", "日用品", "交通", "房租", "水電費", "電話費", "信用卡", "購物", "其他"]);
    const [costData, setCostData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);


    useEffect(() => {
        setBillCostList(JSON.parse(localStorage.getItem('billCostList')) || []);
    }, [setBillCostList]);

    useEffect(() => {
        setCostData(JSON.parse(localStorage.getItem('costData')) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }, [setCostData]);

    const addBillCost = (billCost) => {
        var newBillCostList = [...billCostList, billCost];
        localStorage.setItem('billCostList', JSON.stringify(newBillCostList));
        setBillCostList(newBillCostList);
        updateChart(billCost, 1);
    }

    const deleteBillCost = (billCostToDelete) => {
        const newBillCostList = billCostList.filter(
            billCost => billCost.createAt !== billCostToDelete.createAt
        );
        localStorage.setItem('billCostList', JSON.stringify(newBillCostList));
        setBillCostList(newBillCostList);
        updateChart(billCostToDelete, -1);
    }

    const updateChart = (billCost, sign) => {
        const idx = labels.findIndex((element) => { return element == billCost.tag });
        let newDataArr = [...costData];
        newDataArr[idx] += billCost.cost * sign;
        localStorage.setItem('costData', JSON.stringify(newDataArr));
        setCostData(newDataArr);
    }


    return (
        <BillCostContext.Provider
            value={{
                billCostList,
                addBillCost,
                deleteBillCost,
                labels,
                costData
            }}
        >
            {children}
        </BillCostContext.Provider>
    )
}

export {
    BillCostContext,
    BillCostProvider
}

