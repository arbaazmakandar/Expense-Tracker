import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../Button/Button";
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
      setBalance((prev) => prev - Number(formData.price));

      const lastId = expenseList.length > 0 ? expenseList[0].id : 0;
      setExpenseList((prev) => [{ ...formData, id: lastId + 1 }, ...prev]);
      setFormData({
        title: "",
        category: "",
        price: "",
        date: "",
      });
    }
  };
  const handleEdit = (e) => {};

  useEffect(() => {
    if (editId) {
      const expenseData = expenseList.find((item) => item.id === editId);
      setFormData({
        title: expenseData.title,
        category: expenseData.category,
        price: expenseData.price,
        date: expenseData.date,
      });
    }
  }, [editId]);

  return (
    <div className={StyleSheet.formWrapper}>
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
