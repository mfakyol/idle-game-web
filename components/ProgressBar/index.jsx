import classes from './style.module.scss'

function ProgressBar() {
  return (
    <div className={classes.progressBar}>
      <div className={classes.bar}></div>
    </div>
  )
}

export default ProgressBar