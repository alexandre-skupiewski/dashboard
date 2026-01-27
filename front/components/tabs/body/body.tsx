import { useState, useEffect } from 'react';
import css from './body.module.css';
import { Tab } from "../tabs"

interface Props { 
  items: Tab[]
}

export default function Body({items} : Props) {    
  return (   
    <div className={css.body}>  
      {         
          items.filter(item => item.initialized === true)
          .map(item => {                
            return (
              <div className={`${css.item} ${item.selected ? css.selected : ''}`} key={item.id}>
                <item.component/>
              </div>               
            );    
          })         
        }    
    </div>    
  );
}