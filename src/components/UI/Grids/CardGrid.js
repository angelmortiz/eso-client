import  classes from './Grid.module.css';

const CardGrid = props => {

    return <div className={classes['grid']}>
        <h1 className={classes['title']}>{props.title}</h1>
         
        {/* CONTENT */}
        { props.children && props.children.length 
            ? props.children
            : <img src="/loading.gif" alt="Loading..." className={classes['loading-img']}/>}
    </div>
};

export default CardGrid;