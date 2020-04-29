import React from 'react';
import { ContactBox } from '../components/contact';

export default {
  title: 'Contact',
  component: ContactBox,
};

const longMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
const shortMessage = "This is a short message"

export const Single = () => <ContactBox name="Nestor" lastName="Amesty" email="test@gmail.com"/>

export const List = () => {
  return (
    <div>
      <ContactBox name="Nestor" lastName="Amesty" email="test@gmail.com"/>
      <ContactBox name="Ana" lastName="Caldera" email="test@gmail.com"/>
      <ContactBox name="Cesar" lastName="Brazon" email="test@gmail.com"/>
      <ContactBox name="Fabiola" lastName="Lombardi" email="test@gmail.com"/>
    </div>
  )
}