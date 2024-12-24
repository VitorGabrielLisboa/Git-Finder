import React from 'react'
import './style.css';

function ItemList({title, description, link}) {
  return <div className='itemList'>
    <strong><a href={link}>{title}</a></strong>
    <p>{description}</p>
    <hr />
  </div>
    
}

export default ItemList;
