import React from 'react';
import { TextBubble } from '../core/components/message/textBubble';

export default {
  title: 'TextBubble',
  component: TextBubble,
};

const longMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
const shortMessage = "This is a short message"

export const Text = () => <TextBubble content={shortMessage} time={'13:44 pm'} mine={true}/>

export const LongText = () => <TextBubble content={longMessage} time={'13:44 pm'} mine={true}/>

export const FromOther = () => <TextBubble content={shortMessage} time={'13:44 pm'} mine={false}/>

export const FromOtherLong = () => <TextBubble content={longMessage} time={'13:44 pm'} mine={false}/>