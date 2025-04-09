import { useCallback, useEffect, useState } from "react";
import { apiGet } from "../common/api.js";

export const countPaginatePage = (totalData, limit) => {
  return totalData < 1 ? 0 : Math.ceil(totalData / limit);
};

export const useDataTableFetchData = ({ urlPath, paramsValueModifier }) => {
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [params, setParams] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounce = (fn, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const fetchData = useCallback(async () => {
    if (!params.page || !params.limit) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiGet(urlPath, { params });
      setData(response?.data?.items || []);
      setTotalCount(response?.data?.paginate?.total || 0);
      setPageCount(
        countPaginatePage(response?.data?.paginate?.total, params.limit),
      );
    } catch (err) {
      setError(err);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [urlPath, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onFetchData = useCallback(
    ({ pageIndex, pageSize }) => {
      pageIndex = Math.max(Number(pageIndex) || 0, 0);
      pageSize = Math.max(Number(pageSize) || 10);

      let _params = {
        page: pageIndex + 1,
        limit: pageSize,
      };

      if (typeof paramsValueModifier === "function") {
        let callbackResponse = paramsValueModifier({ ..._params });
        if (callbackResponse) {
          _params = callbackResponse;
        }
      }

      setParams(_params);
    },
    [paramsValueModifier],
  );

  const debouncedFetchData = debounce(onFetchData, 500);

  return {
    onFetchData: debouncedFetchData,
    data,
    loading,
    pageCount,
    totalCount,
    error,
    refresh: fetchData,
  };
};

export default useDataTableFetchData;
