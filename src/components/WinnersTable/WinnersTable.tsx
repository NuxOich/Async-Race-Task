import styles from './WinnersTable.module.css';
import CarIcon from '../CarIcon/CarIcon';
import type { WinnerWithCarInfo } from '../../api/types';

interface WinnersTableProps {
  winners: WinnerWithCarInfo[];
  sortBy: 'wins' | 'time' | null;
  sortOrder: 'ASC' | 'DESC';
  onSort: (field: 'time' | 'wins') => void;
}

const WinnersTable = ({
  winners,
  sortBy,
  sortOrder,
  onSort,
}: WinnersTableProps) => (
  <table className={styles.winnersTable}>
    <thead>
      <tr>
        <th>№</th>
        <th>CAR</th>
        <th>NAME</th>
        <th onClick={() => onSort('wins')}>
          WINS {sortBy === 'wins' && (sortOrder === 'ASC' ? '↑' : '↓')}
        </th>
        <th onClick={() => onSort('time')}>
          BEST TIME (SECONDS){' '}
          {sortBy === 'time' && (sortOrder === 'ASC' ? '↑' : '↓')}
        </th>
      </tr>
    </thead>
    <tbody>
      {winners.map((winner) => (
        <tr key={winner.id}>
          <td>{winner.id}</td>
          <td>
            <CarIcon color={winner.color} />
          </td>
          <td>{winner.name}</td>
          <td>{winner.wins}</td>
          <td>{winner.time}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default WinnersTable;
