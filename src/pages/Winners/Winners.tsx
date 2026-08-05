import styles from './Winners.module.css';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllWinners, selectWinnersTotalCount, setSorting } from '../../features/winners/winnersSlice';
import { WINNERS_PER_PAGE } from '../../constants';
import type { RootState } from '../../store/store';
import { useEffect } from 'react';
import { fetchWinners } from '../../features/winners/winnersThunk';
import WinnersTable from '../../components/WinnersTable/WinnersTable';
import Pagination from '../../components/Pagination/Pagination';

const Winners = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const winners = useAppSelector(selectAllWinners);
  const winnersCount = useAppSelector(selectWinnersTotalCount);
  const sortBy = useAppSelector((state: RootState) => state.winners.sortBy);
  const sortOrder = useAppSelector(
    (state: RootState) => state.winners.sortOrder,
  );

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(winnersCount / WINNERS_PER_PAGE);
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  useEffect(() => {
    dispatch(
      fetchWinners({
        page: safePage, limit: WINNERS_PER_PAGE, sort: sortBy, order: sortOrder,
      }),
    );
  }, [safePage, sortBy, sortOrder, dispatch]);

  const handlePageChange = (pageNumber: number) => {
    setSearchParams((prev) => {
      prev.set('page', pageNumber.toString());
      return prev;
    });
  };

  return (
    <main className={styles.winnersWrapper}>
      <h1 className={styles.heading}>Winners</h1>

      <WinnersTable winners={winners} sortBy={sortBy} sortOrder={sortOrder} onSort={(field) => dispatch(setSorting(field))}
      />

      <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Winners;
