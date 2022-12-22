import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authSlice';
import { logout } from '../../util/apis/auth/authApis';
import classes from './UserInfo.module.css';

const UserInfo = props => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const isUserAuthenticated = useSelector(state => state.auth.isUserAuthenticated);

    //prevents component to be loaded if no user is logged in
    useEffect(() => {
        if(!isUserAuthenticated) {
            navigateTo('/');
        }
    });

    const userLogout = (event) => {
        event.preventDefault();
        logout().then( response => {
            if(response && response.status === 'success'){
                dispatch(authActions.logout());
                navigateTo('/');
            }
        });
    };

    return <section className={classes['card']}>
        <div className={classes['main-section']}>
            {/* NAME */}
            <h1 className={classes['title']}>User Information</h1>

            {/* TODO: Add image */}
            <div className={classes['general-info']}>
                {/* NAME */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Name: </p>
                    <p className={classes['value']}>Angel Ortiz</p>
                </div>
                {/* EMAIL */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Email: </p>
                    <p className={classes['value']}>angelmanuelortiz@gmail.com</p>
                </div>
            </div>

            <button className={classes['logout-btn']} onClick={userLogout}>Log out</button>
        </div>
    </section>
};

export default UserInfo;