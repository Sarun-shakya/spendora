import Select from "../ui/Select.jsx";
import Input from "../ui/Input.jsx";
import { PAYMENT_METHODS, TRANSACTION_TYPES } from "../../constants/index.js";

export default function TransactionFilters({ filters, setFilters, books, categories }) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
      <Input
        placeholder="Search remarks…"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <Select
        placeholder="All books"
        options={books.map((b) => ({ value: b._id, label: b.name }))}
        value={filters.book}
        onChange={(e) => setFilters({ ...filters, book: e.target.value })}
      />
      <Select
        placeholder="All categories"
        options={categories.map((c) => ({ value: c._id, label: c.name }))}
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      />
      <Select
        placeholder="All types"
        options={TRANSACTION_TYPES}
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      />
      <Select
        placeholder="All payment methods"
        options={PAYMENT_METHODS}
        value={filters.paymentMethod}
        onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
      />
    </div>
  );
}
