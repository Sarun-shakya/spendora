import { useCallback, useEffect, useState } from "react";
import * as txApi from "../api/transactions.api.js";

// bookId is optional — when provided, fetches transactions scoped to that book
export function useTransactions(bookId) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = bookId
        ? await txApi.getTransactionsByBook(bookId)
        : await txApi.getTransactions();
      setTransactions(res.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { transactions, loading, error, refetch };
}
