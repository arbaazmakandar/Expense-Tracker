import React, { useEffect, useState } from "react";
import styles from "./TransactionList.module.css";
import TransactionCard from "../TransactionCard/TransactionCard";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import ExpenseForm from "../Forms/ExpenseForm/ExpenseForm";

const TransactionList = ({
  expenseList,
  setExpenseList,
  title,
  balance,
  setBalance,
}) => {
  const [editId, setEditId] = useState(0);
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxRecords = 3;
  const [totalPages, setTotalPages] = useState(0);

  const handleDelete = (id) => {
    const item = expenseList.find((i) => i.id === id);
    setBalance((prev) => Number(prev) + Number(item.price));
    setExpenseList((prev) => prev.filter((item) => item.id !== id));
  };
  const handleEdit = (id) => {
    setEditId(id);
    setIsDisplayEditor(true);
  };

  //pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * maxRecords;
    const endIndex = Math.min(currentPage * maxRecords, expenseList.length);

    setCurrentTransactions([...expenseList].slice(startIndex, endIndex));
    setTotalPages(Math.ceil(expenseList.length / maxRecords));
  }, [currentPage, expenseList]);

  // If all transactions on current page are deleted then go to prev page.
  // If no prev then do nothing, display blank page (which happens by default)
  useEffect(() => {
    if (totalPages < currentPage && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className={styles.transactionsWrapper}>
      {title && <h2>{title}</h2>}
      {expenseList.length > 0 ? (
        <div className={styles.list}>
          <div>
            {currentTransactions.map((transaction) => (
              <TransactionCard
                details={transaction}
                key={transaction.id}
                handleDelete={() => handleDelete(transaction.id)}
                handleEdit={() => handleEdit(transaction.id)}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              updatePage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className={styles.emptyTransactionsWrapper}>
          <p>No transactions!</p>
        </div>
      )}
      <Modal isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
        <ExpenseForm
          setIsOpen={setIsDisplayEditor}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          editId={editId}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>
    </div>
  );
};

export default TransactionList;
