/**
 * @typedef {{
 *  creator: string;
 *  body: string;
 *  createdAt: string;
 * }} Message
 *
 * @typedef {{
 *  name: string;
 *  messages: Message[];
 * }} Tag
 *
 * @typedef {{
 *  id: string;
 *  tags: Tag[];
 * }} Group
 *
 * @typedef {{
 *  loading: boolean;
 *  error: string;
 *  groups: Group[];
 *  page: number;
 *  pages: number;
 * }} StateChatReducer;
 */

/** @type {StateChatReducer} */
const INITIAL_STATE = {
  loading: true,
  error: '',
  groups: [],
  page: 1,
  pages: 1,
};

/**
 *
 * @param {StateChatReducer} state
 * @param {{
 *  type: string;
 *  payload: Record<string, any>;
 * }} action
 * @returns
 */
const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default chatReducer;
