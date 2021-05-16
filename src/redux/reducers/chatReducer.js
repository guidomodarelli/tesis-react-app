import produce from 'immer';
import {
  CHAT_ADD_MESSAGE,
  CHAT_DELETE_MESSAGE,
  CHAT_ERROR,
  CHAT_GET_MESSAGES,
  CHAT_LOADING,
} from '../types/chatTypes';
/**
 *
 * @typedef {{
 *  id: number;
 *  creator: string;
 *  body: string;
 *  tag: string;
 *  chatGroup: string | null;
 *  receptor: string | null;
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
   *    id: number;
   *    messages: Message[],
   *    error: string;
   *  }
   * }} action
   */
  (draft, action) => {
    switch (action.type) {
      case CHAT_ADD_MESSAGE:
        draft.general.get(action.payload.tag).unshift(action.payload.message);
        break;
      case CHAT_DELETE_MESSAGE: {
        const messages = draft.general.get(action.payload.tag);
        const idx = messages.findIndex((msg) => {
          return msg.id === action.payload.id;
        });
        draft.general.get(action.payload.tag).splice(idx, 1);
        break;
      }
      case CHAT_GET_MESSAGES:
        if (!draft.general.has(action.payload.tag)) {
          draft.general.set(action.payload.tag, action.payload.messages);
          return;
        }
        draft.general.get(action.payload.tag).push(...action.payload.messages);
        draft.loading = false;
        break;
      case CHAT_LOADING:
        draft.loading = true;
        break;
      case CHAT_ERROR:
        draft.error = action.payload.error;
        break;
    }
  },
  INITIAL_STATE,
);

export default chatReducer;
