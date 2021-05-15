import produce from 'immer';
import { CHAT_ADD_MESSAGE, CHAT_DELETE_MESSAGE } from '../types/chatTypes';
/**
 * @typedef {{
 *  creator: string;
 *  body: string;
 *  createdAt: string;
 * }} Message
 *
 * @typedef {Map<string, Message[]>} Tags
 *
 * @typedef {{
 *  name: string;
 *  creator: string;
 *  createdAt: string;
 *  tags: Tags;
 * }} Group
 *
 * @typedef {{
 *  loading: boolean;
 *  error: string;
 *  groups: Map<string, Group>;
 *  general: Tags,
 *  page: number;
 *  pages: number;
 * }} StateChatReducer;
 */

/** @type {StateChatReducer} */
const INITIAL_STATE = {
  loading: true,
  error: '',
  groups: new Map(),
  general: new Map(),
  page: 1,
  pages: 1,
};

const chatReducer = produce(
  /**
   *
   * @param {StateChatReducer} draft
   * @param {{
   *  type: string;
   *  payload: {
   *    tag: string;
   *    message: Message;
   *    pos: number;
   *  }
   * }} action
   */
  (draft, action) => {
    switch (action.type) {
      case CHAT_ADD_MESSAGE:
        draft.general.get(action.payload.tag).push(action.payload.message);
        break;
      case CHAT_DELETE_MESSAGE:
        draft.general.get(action.payload.tag).splice(action.payload.pos, 1);
        break;
    }
  },
  INITIAL_STATE,
);

export default chatReducer;
