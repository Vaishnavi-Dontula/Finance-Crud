import { useEffect, useState } from "react";
import api from "./api";
import FinanceCharts from "./FinanceCharts";

const emptyForm = {
  description: "", amount: "", type: "EXPENSE", category: "",
  transactionDate: new Date().toISOString().slice(0, 10)
};

function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadTransactions() {
    try {
      const response = await api.get("");
      setTransactions(response.data);
      setMessage("");
    } catch {
      setMessage("Could not connect. Start the Spring Boot backend on port 8080.");
    }
  }

  useEffect(() => { loadTransactions(); }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { ...form, amount: Number(form.amount) };
    try {
      if (editId === null) {
        await api.post("", data);
        setMessage("Transaction added successfully.");
      } else {
        await api.put(`/${editId}`, data);
        setMessage("Transaction updated successfully.");
      }
      setForm(emptyForm);
      setEditId(null);
      await loadTransactions();
    } catch (error) {
      const details = error.response?.data?.details;
      setMessage(details ? Object.values(details).join(", ") :
        error.response?.data?.error || "Could not save transaction. Check values and backend.");
    }
  }

  function startEdit(item) {
    setEditId(item.id);
    setForm({
      description: item.description, amount: String(item.amount),
      type: item.type, category: item.category, transactionDate: item.transactionDate
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteTransaction(id) {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/${id}`);
      setMessage("Transaction deleted successfully.");
      await loadTransactions();
    } catch {
      setMessage("Could not delete transaction.");
    }
  }

  function cancelEdit() {
    setEditId(null);
    setForm(emptyForm);
    setMessage("");
  }

  const income = transactions.filter(x => x.type === "INCOME")
    .reduce((sum, x) => sum + Number(x.amount), 0);
  const expenses = transactions.filter(x => x.type === "EXPENSE")
    .reduce((sum, x) => sum + Number(x.amount), 0);

  return <main className="page">
    <header className="top">
      <div><p className="small-title">PERSONAL FINANCE</p><h1>Finance Manager</h1>
        <p className="subtitle">Keep track of your income and expenses.</p></div>
      <button className="refresh" onClick={loadTransactions}>Refresh</button>
    </header>

    <section className="summary">
        <div className="summary-card"><p>Total Income</p><h2 className="income">₹{income.toFixed(2)}</h2></div>
        <div className="summary-card"><p>Total Expenses</p><h2 className="expense">₹{expenses.toFixed(2)}</h2></div>
        <div className="summary-card"><p>Balance</p><h2>₹{(income-expenses).toFixed(2)}</h2></div>
    </section>

    <section className="panel">
      <h2>{editId === null ? "Add Transaction" : "Edit Transaction"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>Description<input name="description" value={form.description} onChange={handleChange} placeholder="e.g. Monthly salary" maxLength="200" required /></label>
          <label>Amount (₹)<input name="amount" type="number" min="0.01" step="0.01" value={form.amount} onChange={handleChange} placeholder="e.g. 50000" required /></label>
          <label>Type<select name="type" value={form.type} onChange={handleChange}><option value="INCOME">Income</option><option value="EXPENSE">Expense</option></select></label>
          <label>Category<input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Salary, Food, Travel" maxLength="80" required /></label>
          <label>Date<input name="transactionDate" type="date" value={form.transactionDate} onChange={handleChange} required /></label>
        </div>
        <div className="form-actions">
          <button type="submit" className="primary">{editId === null ? "Add Transaction" : "Save Changes"}</button>
          {editId !== null && <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </section>

    <section className="panel">
      <div className="table-heading"><h2>Transactions</h2><span>{transactions.length} total</span></div>
      {transactions.length === 0 ? <p className="empty">No transactions yet. Add your first transaction above.</p> :
        <div className="table-wrap"><table><thead><tr><th>Description</th><th>Category</th><th>Date</th><th>Type</th><th>Amount</th><th>Actions</th></tr></thead>
          <tbody>{transactions.map(item => <tr key={item.id}>
            <td>{item.description}</td><td>{item.category}</td><td>{item.transactionDate}</td>
            <td><span className={`tag ${item.type.toLowerCase()}`}>{item.type}</span></td>
            <td>₹{Number(item.amount).toFixed(2)}</td>
            <td className="actions"><button className="edit" onClick={() => startEdit(item)}>Edit</button>
              <button className="delete" onClick={() => deleteTransaction(item.id)}>Delete</button></td>
          </tr>)}</tbody></table></div>}
    </section>
    <FinanceCharts transactions={transactions} />
      <section className="panel">
       
      </section>
    <footer>Finance Manager · React + Axios + Spring Boot</footer>
  </main>;
}
export default App;
