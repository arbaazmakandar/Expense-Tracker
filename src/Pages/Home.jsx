import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Card from "../Components/Card/Card";
import PieChart from "../Components/PieChart/PieChart";
import BarChartComponent from "../Components/BarChart/BarChart";
import TransactionList from "../Components/TransactionList/TransactionList";
import Modal from "../Components/Modal/Modal";
import ExpenseForm from "../Components/Forms/ExpenseForm/ExpenseForm";
import AddBalanceForm from "../Components/Forms/AddBalanceForm/AddBalanceForm";
const Home = () => {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Show/Hide modals
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);

  const [spending, setSpending] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  //On first Load after render method
  useEffect(() => {
    const balance = localStorage.getItem("balance");
    if (balance) {
      setBalance(balance);
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }
    const expenseList = JSON.parse(localStorage.getItem("expenseList"));
    if (expenseList) setExpenseList(expenseList);
    setIsMounted(true);
  }, []);

  // saving expenseList in localStorage after it gets changed
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("expenseList", JSON.stringify(expenseList));
    }
    if (expenseList.length > 0) {
      setExpense(
        expenseList.reduce(
          (accumulator, item) => Number(accumulator) + Number(item.price),
          0
        )
      );
    }
    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;

    expenseList.forEach((item) => {
      if (item.category == "food") {
        foodSpends = Number(foodSpends) + Number(item.price);
      } else if (item.category == "entertainment") {
        entertainmentSpends = Number(entertainmentSpends) + Number(item.price);
      } else if (item.category == "travel") {
        travelSpends = Number(travelSpends) + Number(item.price);
      }
    });
    // console.log(foodSpends, entertainmentSpends, travelSpends);
    setSpending({
      food: foodSpends,
      entertainment: entertainmentSpends,
      travel: travelSpends,
    });
  }, [expenseList, isMounted]);

  // saving balance to localStorage when the balance is changed
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
      {/*Upper Section*/}
      <div className={styles.cardWrapper}>
        <Card
          title="Wallet Balance"
          money={balance}
          buttonText="+ Add Income"
          buttonType="success"
          handleClick={() => {
            setIsOpenBalance(true);
          }}
        />
        <Card
          title="Expenses"
          money={expense}
          buttonText="+ Add Expense"
          buttonType="failure"
          success={false}
          handleClick={() => {
            setIsOpenExpense(true);
          }}
        />

        <PieChart
          data={[
            { name: "Food", value: spending.food },
            { name: "Entertainment", value: spending.entertainment },
            { name: "Travel", value: spending.travel },
          ]}
        />
      </div>

      {/*Lower Section*/}
      <div className={styles.transactionsWrapper}>
        <TransactionList
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />
        <BarChartComponent
          data={[
            { name: "Food", value: spending.food },
            { name: "Entertainment", value: spending.entertainment },
            { name: "Travel", value: spending.travel },
          ]}
        />
      </div>

      {/* Modals */}
      <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
        <ExpenseForm
          setIsOpen={setIsOpenExpense}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>
      <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
        <AddBalanceForm setIsOpen={setIsOpenBalance} setBalance={setBalance} />
      </Modal>
    </div>
  );
};

export default Home;
