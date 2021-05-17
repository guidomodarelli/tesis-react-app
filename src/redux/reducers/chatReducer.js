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
 * @typedef {Record<string, Message[]>} Tags
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
 *  groups: Record<string, Group>;
 *  general: Tags,
 *  page: number;
 *  pages: number;
 * }} StateChatReducer;
 */

/** @type {StateChatReducer} */
const INITIAL_STATE = {
  loading: true,
  error: '',
  groups: {},
  general: {
    general: [],
  },
  page: 1,
  pages: 1,
};

/**
 *
 * @param {Message[]} messages
 * @returns
 */
function sortMessages(messages) {
  messages.sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return timeA - timeB;
  });
  return messages;
}

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
   *  };
   *  error: string;
   * }} action
   */
  (draft, action) => {
    switch (action.type) {
      case CHAT_ADD_MESSAGE: {
        const { message } = action.payload;
        draft.general[message.tag].push(message);
        break;
      }
      case CHAT_DELETE_MESSAGE: {
        const { tag, id } = action.payload;
        const messages = draft.general[tag];
        const idx = messages.findIndex((msg) => {
          return msg.id === id;
        });
        if (idx !== -1) {
          draft.general[tag].splice(idx, 1);
        }
        break;
      }
      case CHAT_GET_MESSAGES: {
        const { tag = 'general', messages } = action.payload;
        draft.general[tag] = sortMessages(messages);
        draft.loading = false;
        break;
      }
      case CHAT_LOADING:
        draft.loading = true;
        break;
      case CHAT_ERROR:
        draft.error = action.error;
        break;
    }
  },
  INITIAL_STATE,
);

export default chatReducer;
