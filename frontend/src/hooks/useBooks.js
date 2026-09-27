import { useCallback, useEffect, useState } from "react";
import * as booksApi from "../api/books.api.js";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await booksApi.getBooks();
      setBooks(res.data.data || []);
    } catch (err) {
      // backend returns 404 when the user has no books yet — treat as empty, not an error
      if (err.status === 404) setBooks([]);
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { books, loading, error, refetch };
}
