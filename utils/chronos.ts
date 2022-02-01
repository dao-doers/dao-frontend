/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * @summary creates string of date for URL
 * @return {string} uri
 */
const _createDateQuery = (date: any) =>
  `${date.getFullYear()}-${
    date.getMonth() < 9 ? `0${parseInt(date.getMonth() + 1, 10)}` : parseInt(date.getMonth() + 1, 10)
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;

export const createDateQuery = _createDateQuery;
