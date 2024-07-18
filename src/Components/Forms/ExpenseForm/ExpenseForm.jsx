import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../Button/Button";
import styles from "./ExpenseForm.module.css";
const ExpenseForm = ({
  setIsOpen,
  expenseList,
  setExpenseList,
  editId,
  setBalance,
  balance,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    date: "",
  });
  //Edit Id will be there when open from Recent Transactions, else it will not be there
  console.log(editId);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (balance < Number(formData.price)) {
      enqueueSnackbar(
        "Price should be less than or equal to the wallet balance amount",
        { variant: "warning" }
      );
      setIsOpen(false);
      return;
    } else {
      setBalance((prev) => Number(prev) - Number(formData.price));

      const lastId = expenseList.length > 0 ? expenseList[0].id : 0;
      setExpenseList((prev) => [{ ...formData, id: lastId + 1 }, ...prev]);
      setFormData({
        title: "",
        category: "",
        price: "",
        date: "",
      });
      setIsOpen(false);
    }
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const updatedElementList = expenseList.map((item) => {
      if (item.id === editId) {
        //we check the difference between the old price set and newly entered price of the item
        const difference = Number(item.price) - Number(formData.price);
        //if price entered is more then we check if balance is suffice of that price
        if (difference < 0 && Math.abs(difference) > balance) {
          enqueueSnackbar("Price should not exceed the balance", {
            variant: "warning",
          });
          setIsOpen(false);
          return { ...item }; //we return the item as it is.
        } else {
          //else (means the price entered is less than already price OR wallet balance is suffice of the price)
          //we decrease the balance and set the new price of item
          setBalance((prev) => Number(prev) + Number(difference));

          setIsOpen(false);
          return { ...formData, id: editId };
        }
      } else {
        setIsOpen(false);
        return { ...item };
      }
    });
    setExpenseList(updatedElementList);
  };

  useEffect(() => {
    if (editId) {
      const currentEditedTransaction = expenseList.find(
        (item) => item.id === editId
      );
      setFormData({
        title: currentEditedTransaction.title,
        category: currentEditedTransaction.category,
        price: currentEditedTransaction.price,
        date: currentEditedTransaction.date,
      });
    }
  }, [editId]);

  return (
    <div className={styles.formWrapper}>
      <h3>{editId ? "Edit Expense" : "Add Expenses"}</h3>
      <form onSubmit={editId ? handleEdit : handleAdd}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <Button type="submit" style="primary" shadow>
          {editId ? "Edit Expense" : "Add Expense"}
        </Button>

        <Button style="secondary" shadow handleClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default ExpenseForm;
