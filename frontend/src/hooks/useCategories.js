import { useCallback, useEffect, useState } from "react";
import * as categoriesApi from "../api/categories.api.js";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoriesApi.getCategories();
      setCategories(res.data.data || []);
    } catch (err) {
      if (err.status === 404) setCategories([]);
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { categories, loading, error, refetch };
}
