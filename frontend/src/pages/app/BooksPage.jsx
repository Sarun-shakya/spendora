import { useState } from "react";
import { useBooks } from "../../hooks/useBooks.js";
import * as booksApi from "../../api/books.api.js";
import BookCard from "../../components/books/BookCard.jsx";
import BookFormModal from "../../components/books/BookFormModal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import Button from "../../components/ui/Button.jsx";

export default function BooksPage() {
  const { books, loading, error, refetch } = useBooks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (book) => {
    setEditing(book);
    setModalOpen(true);
  };

  const submit = async (form) => {
    if (editing) await booksApi.updateBook(editing._id, form);
    else await booksApi.createBook(form);
    await refetch();
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await booksApi.deleteBook(deleting._id);
      await refetch();
      setDeleting(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <Spinner full />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink-400">Every book keeps its own running balance.</p>
        <Button size="sm" icon="ri-add-line" onClick={openCreate}>
          New book
        </Button>
      </div>

      {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}

      {books.length === 0 ? (
        <EmptyState
          icon="ri-book-2-line"
          title="No books yet"
          description="Open your first book to start recording income and expenses."
          action={<Button className="mt-2" onClick={openCreate}>Create a book</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onEdit={openEdit} onDelete={setDeleting} />
          ))}
        </div>
      )}

      <BookFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={submit} initialData={editing} />
      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Delete this book?"
        description={`"${deleting?.name}" and its records will be removed from your books list. This can't be undone.`}
      />
    </div>
  );
}
