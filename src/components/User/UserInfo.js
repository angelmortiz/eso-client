import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authSlice';
import { userActions } from '../../store/userSlice';
import { logout } from '../../util/apis/auth/authApis';
import styles from './UserInfo.module.css';

const UserInfo = (props) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state) => state.userInfo.userInfo);

  const userLogout = (e) => {
    e.preventDefault();
    logout().then((response) => {
      if (response && response.isSuccess) {
        dispatch(authActions.logout());
        dispatch(userActions.removeUserInfo());
        navigateTo('/');
      }
    });
  };

  const changePassword = (e) => {
    e.preventDefault();
    navigateTo('/auth/changePassword');
  };

  return (
    <section className={styles['card']}>
      <div className={styles['main-section']}>
        {/* NAME */}
        <h1 className={styles['title']}>User Information</h1>

        {/* TODO: Add image */}
        <div className={styles['general-info']}>
          {/* NAME */}
          <div className={styles['info-block']}>
            <p className={styles['label']}>Name: </p>
            <p className={styles['value']}>{currentUserInfo.fullName}</p>
          </div>
          {/* EMAIL */}
          <div className={styles['info-block']}>
            <p className={styles['label']}>Email: </p>
            <p className={styles['value']}>{currentUserInfo.email}</p>
          </div>
          {/* ROLE */}
          <div className={styles['info-block']}>
            <p className={styles['label']}>Role: </p>
            <p className={styles['value']}>{currentUserInfo.role}</p>
          </div>
          {/* WEIGHT */}
          <div className={styles['info-block']}>
            <p className={styles['label']}>Weight: </p>
            <p className={styles['value']}>
              {currentUserInfo?.userInfo?.basicInfo?.weight}
            </p>
          </div>
          {/* HEIGHT */}
          <div className={styles['info-block']}>
            <p className={styles['label']}>Height: </p>
            <p className={styles['value']}>
              {currentUserInfo?.userInfo?.basicInfo?.height}
            </p>
          </div>
          {/* SEX */}
          <div className={styles['info-block']}>
            <p className={styles['label']}>Sex: </p>
            <p className={styles['value']}>
              {currentUserInfo?.userInfo?.basicInfo?.sex}
            </p>
          </div>
        </div>

        <button
          className={styles['change-password-btn']}
          onClick={changePassword}
        >
          Change password
        </button>

        <hr className={styles['horizontal-division']} />

        <button className={styles['logout-btn']} onClick={userLogout}>
          Log out
        </button>
      </div>
    </section>
  );
};

export default UserInfo;