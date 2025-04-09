import axios from "axios";

/** Axios catch block handler */
const errorHandler = (error) => {
  throw error;
};

function apiGet(apiPath, config = {}) {
  return axios
    .get(apiPath, config)
    .then((response) => response)
    .catch(errorHandler);
}

function apiPost(apiPath, data, config = {}) {
  return axios
    .post(apiPath, data, config)
    .then((response) => response)
    .catch(errorHandler);
}

function apiDelete(apiPath, config = {}) {
  return axios
    .delete(apiPath, config)
    .then((response) => response)
    .catch(errorHandler);
}

function apiPut(apiPath, data, config = {}) {
  return axios
    .put(apiPath, data, config)
    .then((response) => response)
    .catch(errorHandler);
}

function apiPatch(apiPath, data) {
  return axios
    .patch(apiPath, data)
    .then((response) => response)
    .catch(errorHandler);
}

export { apiGet, apiPost, apiDelete, apiPut, apiPatch };
