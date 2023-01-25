import  styles from './GridView.module.css';

const GridView = props => {

    return <div className={styles['grid']}>
        <h1 className={styles['title']}>{props.title}</h1>
         
        {/* CONTENT */}
        { props.children && props.children.length 
            ? props.children
            : <img src="/loading.gif" alt="Loading..." className={styles['loading-img']}/>}
    </div>
};

export default GridView;