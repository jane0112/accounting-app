import React, { useState, useContext, useRef } from 'react';
import './BillCost.css'
import moment from 'moment'
import { BillCostContext } from '../BillCostContext'



const BillCost = props => {
    const { addBillCost, deleteBillCost, billCostList } = useContext(BillCostContext);

    let getDateToday = moment().format('L');
    let dateArr = getDateToday.split('/');
    let newDate = dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1];
    const [date, setDate] = useState(newDate);
    const [cost, setCost] = useState(0);
    const [tag, setTag] = useState('其他');
    const [adjustSign, setAdjustSign] = useState(1); // For adjust cost
    const [adjustBtnValue, setAdjustBtnValue] = useState(['+1', '+10', '+100', '+1000']);
    const billsContainerRef = useRef(null);


    const onFormSubmit = e => {
        e.preventDefault();
        const billCost = {
            date: date,
            cost: parseFloat(cost),
            tag: tag,
            createAt: new Date().getTime()
        };
        addBillCost(billCost);
        clearForm();
    };

    const clearForm = () => {
        setCost(0);
        setTag('其他');
    };

    const swapAdjustSign = () => {
        setAdjustSign(-adjustSign)
        setAdjustBtnValue(adjustBtnValue.map(
            val => {
                let newVal = parseFloat(-val)
                if (newVal < 0) {
                    return String(newVal)
                } else {
                    return '+' + String(newVal)
                };
            })
        );
    };

    const adjustCost = (num) => {
        var newCost = parseFloat(cost);
        newCost += parseFloat(num * adjustSign);
        setCost(newCost);
    }


    return (
        <div ref={billsContainerRef}>
            <div className="billsContainer">
                <div className="billEditor">
                    <form onSubmit={onFormSubmit}>
                        <input
                            type="date" id="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                        />
                        <div className="costInputContianer">
                            <input
                                type="number" id="cost"
                                name="cost" min="1"
                                value={cost}
                                onChange={e => setCost(e.target.value)}
                                required
                            />
                            <div className="btnContainer">
                                <div className="adjustBtn"
                                    onClick={swapAdjustSign}>
                                    +/-
                                </div>
                                <div className="adjustBtn"
                                    onClick={() => adjustCost(1)}>
                                    {adjustBtnValue[0]}
                                </div>
                                <div className="adjustBtn"
                                    onClick={() => adjustCost(10)}>
                                    {adjustBtnValue[1]}
                                </div>
                                <div className="adjustBtn"
                                    onClick={() => adjustCost(100)}>
                                    {adjustBtnValue[2]}
                                </div>
                                <div className="adjustBtn"
                                    onClick={() => adjustCost(1000)}>
                                    {adjustBtnValue[3]}
                                </div>
                                <div className="adjustBtn acBtn"
                                    onClick={() => setCost(0)}>
                                    AC
                                </div>
                            </div>
                        </div>

                        <div className="tags">
                            <div className="tag">
                                <input
                                    type="radio" id="breakfast"
                                    name="consumeType"
                                    value="早餐"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "早餐"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="breakfast" >早餐</label>
                            </div>
                            <div className="tag">
                                <input
                                    type="radio" id="lunch"
                                    name="consumeType"
                                    value="午餐"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "午餐"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="lunch" >午餐</label>
                            </div>
                            <div className="tag">
                                <input
                                    type="radio" id="dinner"
                                    name="consumeType"
                                    value="晚餐"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "晚餐"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="dinner" >晚餐</label>
                            </div>
                            <div className="tag">
                                <input
                                    type="radio" id="snacks"
                                    name="consumeType" value="零食"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "零食"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="snacks" >零食</label>
                            </div>
                            <div className="tag">
                                <input
                                    type="radio" id="supplies"
                                    name="consumeType"
                                    value="日用品"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "日用品"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="supplies">日用品</label>
                            </div>
                            <div className="tag">
                                <input
                                    type="radio" id="traffic"
                                    name="consumeType" value="交通"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "交通"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="traffic">交通</label>
                            </div>
                            <div className="tag">
                                <input
                                    type="radio" id="rental"
                                    name="consumeType" value="房租"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "房租"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="rental" >房租</label>
                            </div>
                            <div className="tag">
                                <input
                                    type="radio" id="utilities"
                                    name="consumeType"
                                    value="水電費"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "水電費"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="utilities" >水電費</label>
                            </div>
                            <div className="tag">
                                <input
                                    type="radio" id="phoneBill"
                                    name="consumeType" value="電話費"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "電話費"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="phoneBill" >電話費</label>
                            </div >

                            <div className="tag">
                                <input
                                    type="radio" id="creditCard"
                                    name="consumeType" value="信用卡"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "信用卡"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="creditCard" >信用卡</label>
                            </div>
                            <div className="tag">
                                <input
                                    type="radio" id="shopping"
                                    name="consumeType" value="購物"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "購物"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="shopping" >購物</label>
                            </div>

                            <div className="tag">
                                <input
                                    type="radio" id="others"
                                    name="consumeType" value="其他"
                                    onChange={e => setTag(e.target.value)}
                                    checked={tag === "其他"}
                                />
                                <span className="indicator"></span>
                                <label htmlFor="others" >其他</label>
                            </div >
                        </div>
                        <button className="addBtn">+ADD</button>
                    </form >
                </div >
                <div className="billListContainer">
                    <div className="billList">
                        <table>
                            <thead className="billTitle">
                                <tr>
                                    <td></td>
                                    <td className="detail">日期</td>
                                    <td className="detail">項目</td>
                                    <td className="detail">花費</td>
                                </tr>
                            </thead>
                            <tbody className="bill">
                                {billCostList.map((billCost, idx) => {
                                    return (
                                        <tr key={idx} className="billCost">
                                            <td>
                                                <span className="deleteBtn"
                                                    onClick={() => deleteBillCost(billCost, idx)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </span>
                                            </td>
                                            <td className="detail date">{billCost.date}</td>
                                            <td className="detail">{billCost.tag}</td>
                                            <td className="detail">${billCost.cost}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div >
        </div >
    )
}





export default BillCost;