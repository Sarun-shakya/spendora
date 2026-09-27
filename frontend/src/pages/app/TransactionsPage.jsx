import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTransactions } from "../../hooks/useTransactions.js";
import { useBooks } from "../../hooks/useBooks.js";
import { useCategories } from "../../hooks/useCategories.js";
import * as txApi from "../../api/transactions.api.js";
import TransactionTable from "../../components/transactions/TransactionTable.jsx";
import TransactionFilters from "../../components/transactions/TransactionFilters.jsx";
import TransactionFormModal from "../../components/transactions/TransactionFormModal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import Button from "../../components/ui/Button.jsx";

const emptyFilters = { search: "", book: "", category: "", type: "", paymentMethod: "" };

export default function TransactionsPage() {
  const { transactions, loading, error, refetch } = useTransactions();
  const { books } = useBooks();
  const { categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(emptyFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setEditing(null);
      setModalOpen(true);
      searchParams.delete("new");
      setSearchParams(searchParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (filters.book && t.book?._id !== filters.book && t.book !== filters.book) return false;
      if (filters.category && t.category?._id !== filters.category) return false;
      if (filters.type && t.transactionType !== filters.type) return false;
      if (filters.paymentMethod && t.paymentMethod !== filters.paymentMethod) return false;
      if (filters.search && !t.remarks?.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [transactions, filters]);

  const submit = async (fd) => {
    if (editing) await txApi.updateTransaction(editing._id, fd);
    else await txApi.createTransaction(fd);
    await refetch();
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await txApi.deleteTransaction(deleting._id);
      await refetch();
      setDeleting(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <Spinner full />;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-ink-800">Every transaction across all your books.</p>
        <Button size="sm" icon="ri-add-line" onClick={() => { setEditing(null); setModalOpen(true); }}>
          Add transaction
        </Button>
      </div>

      {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}

      {transactions.length === 0 ? (
        <EmptyState
          icon="ri-exchange-line"
          title="No transactions yet"
          description="Add your first income or expense entry to get started."
          action={<Button className="mt-2" onClick={() => setModalOpen(true)}>Add transaction</Button>}
        />
      ) : (
        <>
          <TransactionFilters filters={filters} setFilters={setFilters} books={books} categories={categories} />
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-400">No transactions match these filters.</p>
          ) : (
            <TransactionTable
              transactions={filtered}
              showBook
              onEdit={(t) => { setEditing(t); setModalOpen(true); }}
              onDelete={setDeleting}
            />
          )}
        </>
      )}

      <TransactionFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={submit}
        books={books}
        categories={categories}
        initialData={editing}
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
