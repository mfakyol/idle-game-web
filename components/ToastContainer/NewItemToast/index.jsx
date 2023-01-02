import classes from "./style.module.scss";

import items from "@constants/items";

function NewItemToast({ toast }) {
  const item = items[toast.itemId];

  
  return item ? <div className={classes.newItemToast}>
    <span className={classes.quantity}>+{toast.quantity}</span>
    <img className={classes.icon} src={item.icon} alt="" />
    <span className={classes.total}>({toast.total})</span>
  </div> : null;
}

export default NewItemToast;
