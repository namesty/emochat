import React from 'react';
import { ListItem } from '../core/components/listItem';

export default {
  title: 'List Item',
  component: ListItem,
};

export const Single = () => <ListItem bigText="Nestor" smallText="test@gmail.com"/>

export const List = () => {
  return (
    <div>
      <ListItem bigText="Nestor" smallText="test@gmail.com"/>
      <ListItem bigText="Ana" smallText="test@gmail.com"/>
      <ListItem bigText="Cesar" smallText="test@gmail.com"/>
      <ListItem bigText="Fabiola" smallText="test@gmail.com"/>
    </div>
  )
}