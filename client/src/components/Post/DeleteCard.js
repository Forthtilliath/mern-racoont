import React from 'react';
import { useDispatch } from 'react-redux';
import { deletetePost } from '../../actions/post.actions';

const DeleteCard = ({ id }) => {
    const dispatch = useDispatch();
    const deleteQuote = () => dispatch(deletetePost(id));

    const confirmation = () => {
        if (window.confirm('Voulez-vous supprimer cet article ?'))
            deleteQuote();
    };

    return (
        <div onClick={confirmation}>
            <img src="./img/icons/trash.svg" alt="supprimer" />
        </div>
    );
};

export default DeleteCard;