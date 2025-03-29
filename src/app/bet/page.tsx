"use client";

import { useState } from 'react';
import {Button, InputNumber, InputNumberProps} from "antd";

const Page: React.FC = () => {
    const [totalYes, setTotalYes] = useState<number>(0);
    const [totalNo, setTotalNo] = useState<number>(0);
    const [userBalance, setUserBalance] = useState<number>(1000); // Начальный баланс пользователя
    const [userBet, setUserBet] = useState<{ amount: number; choice: 'yes' | 'no' }>({ amount: 0, choice: 'yes' });
    const [eventEnded, setEventEnded] = useState<boolean>(false);
    const [eventResult, setEventResult] = useState<'yes' | 'no' | null>(null);

    const onChange: InputNumberProps['onChange'] = (value) => {
        setUserBet({ ...userBet, amount: parseFloat(value) })
    };

    // Функция для расчета коэффициента
    const calculateCoefficient = (total: number, totalOpposite: number) => {
        if (total === 0) return 1; // Если ставок нет, коэффициент 1
        const rawCoefficient = totalOpposite / total;
        return rawCoefficient < 1 ? 1 : rawCoefficient.toFixed(2); // Коэффициент не может быть меньше 1
    };

    const handleBet = (choice: 'yes' | 'no', amount: number) => {
        if (userBalance >= amount) {
            setUserBalance(userBalance - amount);
            setUserBet({ amount, choice });
            if (choice === 'yes') {
                setTotalYes(totalYes + amount);
            } else {
                setTotalNo(totalNo + amount);
            }
        } else {
            alert('Недостаточно средств на балансе');
        }
    };

    const endEvent = (result: 'yes' | 'no') => {
        setEventEnded(true);
        setEventResult(result);

        if (userBet.amount > 0) {
            if (userBet.choice === result) {
                // Рассчитываем коэффициент для выигрыша
                const coefficient = parseFloat(
                    calculateCoefficient(
                        result === 'yes' ? totalYes : totalNo,
                        result === 'yes' ? totalNo : totalYes
                    ) as string
                );
                const winnings = userBet.amount * coefficient; // Выигрыш = ставка * коэффициент
                setUserBalance(userBalance + winnings);
                alert(`Вы выиграли ${winnings.toFixed(2)}!`);
            } else {
                alert('Вы проиграли свою ставку.');
            }
        }
    };

    return (
        <div>
            <h1>Событ: Сделаю ли я этот сайт до конца?</h1>
            <p>Ваш баланс: {userBalance.toFixed(2)}</p>

            {!eventEnded ? (
                <>
                    <div>
                        <h2>Ставки:</h2>
                        <p>
                            На &#34;Да&#34;: {totalYes.toFixed(2)} (Коэффициент:{" "}
                            {calculateCoefficient(totalYes, totalNo)})
                        </p>
                        <p>
                            На &#34;Нет&#34;: {totalNo.toFixed(2)} (Коэффициент:{" "}
                            {calculateCoefficient(totalNo, totalYes)})
                        </p>
                    </div>

                    <div>
                        <h2>Сделать ставку:</h2>
                        {/*<input*/}
                        {/*    type="number"*/}
                        {/*    min="1"*/}
                        {/*    max={userBalance}*/}
                        {/*    value={userBet.amount || ''}*/}
                        {/*    onChange={(e) =>*/}
                        {/*        setUserBet({ ...userBet, amount: parseFloat(e.target.value) })*/}
                        {/*    }*/}
                        {/*/>*/}
                        <InputNumber<number>
                            defaultValue={1000}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            onChange={onChange}
                        />
                        <Button onClick={() => handleBet('yes', userBet.amount)} type="primary">Поставить на &#34;Да&#34;</Button>
                        <Button style={{background: "red"}} onClick={() => handleBet('no', userBet.amount)} type="primary">Поставить на &#34;Нет&#34;</Button>
                    </div>

                    <div>
                        <button onClick={() => endEvent('yes')}>Завершить событие (Да)</button>
                        <button onClick={() => endEvent('no')}>Завершить событие (Нет)</button>
                    </div>
                </>
            ) : (
                <div>
                    <h2>Событие завершено!</h2>
                    <p>Результат: {eventResult === 'yes' ? 'Да' : 'Нет'}</p>
                    <p>Ваш баланс: {userBalance.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default Page;