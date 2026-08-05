import styles from './Pagination.module.css';
import Button from '../Button/Button';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
        icon={faChevronLeft}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Button
        icon={faChevronRight}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      />
    </div>
  </div>
);

export default Pagination;
