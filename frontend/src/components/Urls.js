/**
 *  This file define the API's urls.
 */

const baseURL = "http://127.0.0.1:8000/api";

export const getArticlesURL = () => `${baseURL}/articles/`;
export const getWebSitesURL = () => `${baseURL}/websites/`;
export const getTagsURL = () => `${baseURL}/tags/`;
