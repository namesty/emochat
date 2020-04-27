import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { MessageBox } from '../components/message/message';

export default {
  title: 'Message',
  component: MessageBox,
};

const longMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
const shortMessage = "This is a short message"

export const Text = () => <MessageBox content={shortMessage} time={'13:44 pm'} mine={true}/>

export const LongText = () => <MessageBox content={longMessage} time={'13:44 pm'} mine={true}/>

export const FromOther = () => <MessageBox content={shortMessage} time={'13:44 pm'} mine={false}/>

export const FromOtherLong = () => <MessageBox content={longMessage} time={'13:44 pm'} mine={false}/>