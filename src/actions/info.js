'use strict';

import _ from 'lodash';

import transformDate from '../utils/transformDate';
import * as types from '../constants/actionType';

function getErrorDetail (json) {
  return {
    type: types.ERROR_DETAIL,
    list: json.result.map(jsError => _.update(jsError, 'date', date => transformDate(date))),
    abstract: _.chain(json.abstract).update('earliest', (date => transformDate(date))).update('latest', (date => transformDate(date))).value()
  };
}

export function fetchErrorDetail (id) {
  return dispatch => {
    //dispatch(loadingShow);
    return fetch(`/api/error/detail/${id}`)
      .then(response => response.json())
      .then(json => dispatch(getErrorDetail(json)));
  }
}