import classes from './UserInfo.module.css';

const UserInfo = props => {
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
        </div>
    </section>
};

export default UserInfo;