
export function changeMessageText (field, value) {
  return {
    type: 'CHANGE_MESSAGE_TEXT',
    field,
    value
  };
}
