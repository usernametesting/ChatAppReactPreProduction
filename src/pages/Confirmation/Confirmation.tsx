import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setLoadingState } from '../../store/userSlice';
import { confirmEmail } from '../../services/apis/authService';
import { ConfirmEmail, ServiceResponse } from '../../types/Auths/auth';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';



const Confirmation: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    useEffect(() => {

        dispatch(setLoadingState(true));

        const fetch = async () => {
            const queryParams = new URLSearchParams(window.location.search);

            const model: ConfirmEmail = {
                id: queryParams.get('id') ?? undefined,
                token: queryParams.get('token') ?? undefined,
            };
            var response = await confirmEmail(model) as ServiceResponse;
            if (response.success) {
                alertify.success("your account confirmed succsessfully");
                navigate('/login');
            }
            else
                alertify.error("account confirmation was unsuccsessfull");

            dispatch(setLoadingState(false));
        }

        fetch();


    });

    return (
        <div>
        </div>
    );
};

export default Confirmation;