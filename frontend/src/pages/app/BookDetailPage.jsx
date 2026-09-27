import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as booksApi from "../../api/books.api.js";
import * as txApi from "../../api/transactions.api.js";
import * as analyticsApi from "../../api/analytics.api.js";
import { useTransactions } from "../../hooks/useTransactions.js";
import { useCategories } from "../../hooks/useCategories.js";
import StatCard from "../../components/ui/StatCard.jsx";
import TransactionTable from "../../components/transactions/TransactionTable.jsx";
import TransactionFormModal from "../../components/transactions/TransactionFormModal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import Button from "../../components/ui/Button.jsx";
import { formatCurrency } from "../../utils/format.js";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { transactions, loading: txLoading, refetch: refetchTx } = useTransactions(id);
  const { categories } = useCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [bookRes, summaryRes] = await Promise.all([
        booksApi.getBookById(id),
        analyticsApi.getBookSummary(id),
      ]);
      setBook(bookRes.data.data);
      setSummary(summaryRes.data.data);
    } catch (err) {
      setError(err.message);
      if (err.status === 404) navigate("/app/books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitTransaction = async (fd) => {
    if (editing) await txApi.updateTransaction(editing._id, fd);
    else await txApi.createTransaction(fd);
    await Promise.all([refetchTx(), load()]);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await txApi.deleteTransaction(deleting._id);
      await Promise.all([refetchTx(), load()]);
      setDeleting(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const res = await txApi.downloadBookTransactionPDF(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book.name}-transactions.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err.message || "Couldn't download the PDF.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <Spinner full />;
  if (!book) return null;

  return (
    <div className="space-y-6">
      <div>
        <Link to="/app/books" className="text-sm text-ink-400 hover:text-ink-700">
          <i className="ri-arrow-left-line align-middle" /> Books
        </Link>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl text-ink-900">{book.name}</h2>
            <p className="text-sm text-ink-400">{book.description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon="ri-file-download-line"
              onClick={downloadPDF}
              loading={downloading}
              disabled={transactions.length === 0}
            >
              Download PDF
            </Button>
            <Button size="sm" icon="ri-add-line" onClick={() => { setEditing(null); setModalOpen(true); }}>
              Add transaction
            </Button>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-rose-500">{error}</p>}

      {summary && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Income" value={formatCurrency(summary.totalIncome)} tone="income" />
          <StatCard label="Expense" value={formatCurrency(summary.totalExpense)} tone="expense" />
          <StatCard label="Balance" value={formatCurrency(summary.balance)} />
          <StatCard label="Transactions" value={summary.totalTransactions} />
        </div>
      )}

      {txLoading ? (
        <Spinner full />
      ) : transactions.length === 0 ? (
        <EmptyState
          icon="ri-exchange-line"
          title="No transactions in this book yet"
          description="Add your first entry to start tracking this book's balance."
          action={<Button className="mt-2" onClick={() => { setEditing(null); setModalOpen(true); }}>Add transaction</Button>}
        />
      ) : (
        <TransactionTable
          transactions={transactions}
          onEdit={(t) => { setEditing(t); setModalOpen(true); }}
          onDelete={setDeleting}
        />
      )}

      <TransactionFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={submitTransaction}
        books={[book]}
        categories={categories}
        initialData={editing}
        lockedBookId={book._id}
      />
      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Delete this transaction?"
        description="This entry will be removed permanently."
      />
    </div>
  );
}
