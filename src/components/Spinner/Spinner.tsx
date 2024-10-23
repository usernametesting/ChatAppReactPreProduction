import React, { useEffect } from 'react';
import './Spinner.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Spinner: React.FC = () => {
  // const [visible, setVisible] = useState(false);
  const { loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
      // setVisible(true);
  }, [loading]);


  return (
    <div className={`ball-atom-container ${loading ? 'fade-in' : ''} ${loading ? '' : 'hidden-spinner'}`}>

      <div className="ball-atom">
        <div></div>
        <div></div>
        <div></div>
        <div></div>

      </div>
    </div>
  );
};

export default Spinner;
