import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LoadingComponent, EmptyComponent, LoadingMoreComponent, InitialErrorComponent, ErrorComponent, NoMoreComponent } from "../DefaultNode/index.tsx";
import sty from "./index.module.css";

export interface PageParams {
  pageSize: number;
  page: number;
  [key: string]: any;
}

export interface ListFlowProps<T> {
  request: (pageParams: PageParams) => Promise<any>;
  renderItem: (item: T) => ReactNode;
  params?: Record<string, any>;
  className?: string;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  loadingMoreComponent?: ReactNode;
  errorComponent?: ReactNode;
  noMoreComponent?: ReactNode;
  initialErrorComponent?: ReactNode;
}

export default function ListFlow<T>({
  request,
  renderItem,
  params,
  className,
  loadingComponent = LoadingComponent,
  emptyComponent = EmptyComponent,
  loadingMoreComponent = LoadingMoreComponent,
  errorComponent = ErrorComponent,
  noMoreComponent = NoMoreComponent,
  initialErrorComponent = InitialErrorComponent,
}: ListFlowProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialError, setInitialError] = useState("");
  const [loadMoreError, setLoadMoreError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const fetchData = async (isFirstFetch = false) => {
    try {
      if (isFirstFetch) {
        setIsFirstLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setLoadMoreError("");

      const res = await request({
        page: page,
        pageSize: 10,
        ...params,
      });
      const data = res.data;

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      if (isFirstFetch) {
        setInitialError("加载失败，请稍后重试");
      } else {
        setLoadMoreError("加载失败，请稍后重试");
      }
    } finally {
      setIsFirstLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore && !isFirstLoading) {
      fetchData(false);
    }
  }, [inView]);

  if (initialError) {
    return <div>{initialErrorComponent}</div>;
  }

  if (isFirstLoading) {
    return <div>{loadingComponent}</div>;
  }

  return (
    <div className={`${sty.listContainer} ${className}`}>
      {items.map((item, index) => renderItem && <div key={index}>{renderItem(item)}</div>)}

      {items.length === 0 && !isLoadingMore && <div>{emptyComponent}</div>}

      <div ref={ref}>
        {isLoadingMore && loadingMoreComponent}
        {loadMoreError && errorComponent}
        {!hasMore && items.length > 0 && noMoreComponent}
      </div>
    </div>
  );
}
