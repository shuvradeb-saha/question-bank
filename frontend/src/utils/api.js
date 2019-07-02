import 'whatwg-fetch';
import { create } from 'apisauce';
import URI from 'urijs';

function getFqdn(url) {
  if (!!url && url !== '/') {
    return url;
  }

  const windowUrl = URI(window.location.href);
  const baseUrl = `${windowUrl.protocol()}://${windowUrl.host()}/`;
  return baseUrl;
}

export class Api {
  constructor(baseUrl) {
    this.baseUrl = getFqdn(baseUrl);
    this.api = create({
      baseURL: this.baseUrl,
      withCredentials: true,
    });
  }

  getBaseUrl = () => this.baseUrl;

  getDataFromResponse = response => {
    if (response.ok && (response.status >= 200 && response.status < 300)) {
      return response.data;
    }

    console.warn('Api call failed with response = ', response);
    const error = new Error(`${response.statusText} and ${response.problem}`);
    error.response = response;
    if (response.data && response.data.message) {
      error.message = response.data.message;
    }
    throw error;
  };

  get = async (uri, params) => {
    try {
      const response = await this.api.get(uri, params);
      return this.getDataFromResponse(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  post = async (uri, data, params) => {
    try {
      const response = await this.api.post(uri, data, params);
      return this.getDataFromResponse(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  put = async (uri, data, params) => {
    try {
      const response = await this.api.put(uri, data, params);
      return this.getDataFromResponse(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  delete = async uri => {
    try {
      const response = await this.api.delete(uri);
      return this.getDataFromResponse(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

const defaultAPI = new Api(process.env.REACT_APP_API_PREFIX);
export default defaultAPI;
