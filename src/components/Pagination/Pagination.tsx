import styles from './Pagination.module.css';
import Button from '../Button/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => (
  <div className={styles.pages}>
    <p>{`Page ${currentPage}`}</p>
    <div>
      <Button
        icon="<"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Button
        icon=">"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      />
    </div>
  </div>
);

export default Pagination;
