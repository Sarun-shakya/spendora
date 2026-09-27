import { useState } from "react";
import { useCategories } from "../../hooks/useCategories.js";
import * as categoriesApi from "../../api/categories.api.js";
import CategoryFormModal from "../../components/categories/CategoryFormModal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import Button from "../../components/ui/Button.jsx";

export default function CategoriesPage() {
  const { categories, loading, error, refetch } = useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const submit = async (form) => {
    if (editing) await categoriesApi.updateCategory(editing._id, form);
    else await categoriesApi.createCategory(form);
    await refetch();
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await categoriesApi.deleteCategory(deleting._id);
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
        <p className="text-sm text-ink-400">Categories are shared across every book.</p>
        <Button size="sm" icon="ri-add-line" onClick={() => { setEditing(null); setModalOpen(true); }}>
          New category
        </Button>
      </div>

      {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}

      {categories.length === 0 ? (
        <EmptyState
          icon="ri-price-tag-3-line"
          title="No categories yet"
          description="Create a category before logging your first transaction."
          action={<Button className="mt-2" onClick={() => setModalOpen(true)}>Create a category</Button>}
        />
      ) : (
        <div className="overflow-hidden rounded-md border border-ink-100 bg-white">
          {categories.map((c) => (
            <div key={c._id} className="ledger-rule flex items-center justify-between px-5 py-4 first:border-t-0">
              <div>
                <p className="text-sm text-ink-800">{c.name}</p>
                {c.description && <p className="text-xs text-ink-400">{c.description}</p>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(c); setModalOpen(true); }} className="p-1.5 text-ink-400 hover:text-ledger-600" aria-label="Edit">
                  <i className="ri-pencil-line" />
                </button>
                <button onClick={() => setDeleting(c)} className="p-1.5 text-ink-400 hover:text-rose-600" aria-label="Delete">
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CategoryFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={submit} initialData={editing} />
      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Delete this category?"
        description={`"${deleting?.name}" will no longer be available for new transactions.`}
      />
    </div>
  );
}
