import styles from './Winners.module.css';
import Button from '../../components/Button/Button';
import CarIcon from '../../components/CarIcon/CarIcon';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSortedWinners, selectWinnersTotalCount, setSorting } from '../../features/winners/winnersSlice';
import { WINNERS_PER_PAGE } from '../../constants';
import type { RootState } from '../../store/store';



const Winners = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const winners = useAppSelector(selectSortedWinners);
  const winnersCount = useAppSelector(selectWinnersTotalCount);
  const sortBy = useAppSelector((state: RootState) => state.winners.sortBy);
  const sortOrder = useAppSelector((state: RootState) => state.winners.sortOrder);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(winnersCount / WINNERS_PER_PAGE);
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const startIndex = (safePage - 1) * WINNERS_PER_PAGE;
  const endIndex = startIndex + WINNERS_PER_PAGE;

  const currentWinners = winners.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setSearchParams((prev) => {
      prev.set('page', pageNumber.toString());
      return prev;
    });
  };

  return (
    <main className={styles.winnersWrapper}>
      <h1 className={styles.heading}>Winners</h1>
      <table className={styles.winnersTable}>
        <thead>
          <tr>
            <th>№</th>
            <th>CAR</th>
            <th>NAME</th>
            <th onClick={() => dispatch(setSorting('wins'))}>
              WINS {sortBy === 'wins' && (sortOrder === 'ASC' ? '↑' : '↓')}
            </th>
            <th onClick={() => dispatch(setSorting('time'))}>
              BEST TIME (SECONDS) {sortBy === 'time' && (sortOrder === 'ASC' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentWinners.map((winner) => (
            <tr key={winner.id}>
              <td>{winner.id}</td>
              <td><CarIcon color={winner.color} /></td>
              <td>{winner.name}</td>
              <td>{winner.wins}</td>
              <td>{winner.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pages}>
        <p>{`Page ${safePage}`}</p>
        <div>
          <Button icon='<' onClick={() => handlePageChange(safePage - 1)} disabled={safePage === 1} />
          <Button icon='>' onClick={() => handlePageChange(safePage + 1)} disabled={safePage >= totalPages} />
        </div>
      </div>
    </main>
  );
};

export default Winners;