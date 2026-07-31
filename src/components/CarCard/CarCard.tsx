import styles from './CarCard.module.css'
import Button from '../Button/Button';
import CarIcon from '../CarIcon/CarIcon';



interface CarCardProps {
  name: string;
  color: string;
  onEdit: () => void;
  onRemove: () => void;
}

const CarCard = ({ name, color, onEdit, onRemove }: CarCardProps) => {

  return (
    <div className={styles.carCardWrapper}>
      <div className={styles.carBackground}>
        <div className={styles.carSetting}>
          <Button text='Edit' onClick={onEdit} />
          <Button text='Remove' onClick={onRemove} />
        </div>
        <p className={styles.carName}>{name}</p>
      </div>

      <div className={styles.carRaceTrack}>
        <CarIcon color={color} />
        <div className={styles.track}></div>
      </div>
    </div>
  )
};

export default CarCard;