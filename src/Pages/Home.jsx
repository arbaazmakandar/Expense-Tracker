import React, { useState } from "react";
import styles from "./Home.module.css";
import Card from "../Components/Card/Card";
import PieChart from "../Components/PieChart/PieChart";
import BarChart from "../Components/BarChart/BarChart";
import TransactionList from "../Components/TransactionList/TransactionList";
import Modal from "../Components/Modal/Modal";
import ExpenseForm from "../Components/Forms/ExpenseForm/ExpenseForm";
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

  return (
    <>
      {/*Upper Section*/}
      <div style={styles.cardWrapper}>
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
      <div style={styles.transactionWrapper}>
        <TransactionList
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />
        <BarChart
          data={[
            { name: "Food", value: spending.food },
            { name: "Entertainment", value: spending.entertainment },
            { name: "Travel", value: spending.travel },
          ]}
        />
      </div>

      {/* Modals */}
      <Modal>
        <ExpenseForm
          setIsOpen={setIsOpenExpense}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>
    </>
  );
};

export default Home;
