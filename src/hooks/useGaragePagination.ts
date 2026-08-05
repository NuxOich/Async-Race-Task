import { useSearchParams } from 'react-router-dom';
import { CARS_PER_PAGE } from '../constants';

export const useGaragePagination = (totalCount: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(totalCount / CARS_PER_PAGE);
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const handlePageChange = (pageNumber: number) => {
    setSearchParams((prev) => {
      prev.set('page', pageNumber.toString());
      return prev;
    });
  };

  return { safePage, setSearchParams, totalPages, handlePageChange };
};
