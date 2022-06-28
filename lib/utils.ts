export const createMarkup = (text: string) => {
  return { __html: text.replace(/(?:\r\n|\r|\n)/g, '<br>') };
};
