import { useState, useCallback } from "react";
import { api } from "../services/api";

const HISTORY_KEY = "quill_history";
const MAX_HISTORY = 8;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveHistory(item, current) {
  const updated = [item, ...current].slice(0, MAX_HISTORY);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function useContentGenerator() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(loadHistory);

  const generate = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await api.generateContent(formData);
      setResult(data);
      setHistory((prev) => saveHistory(data, prev));
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return { result, loading, error, history, generate, clearResult, clearHistory };
}
