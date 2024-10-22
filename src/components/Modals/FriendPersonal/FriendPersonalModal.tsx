import React from 'react';
import './FriendPersonalModal.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const FriendPersonalModal: React.FC = () => {
  const { selectedFriend } = useSelector((state: RootState) => state.users);

  return (
    <div className="modal fade" id="friendPersonalModal" tabIndex={-1} role="dialog" aria-labelledby="friendPersonalModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content no-background">
          <div className="modal-body">
            <img src={selectedFriend?.profImageUrl} alt="image" className="img-responsive profile-img" />
          </div>
          <h1>{selectedFriend?.biografy}</h1>
        </div>
      </div>
    </div>
  );
};

export default FriendPersonalModal;
