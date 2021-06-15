// @ts-check
import {curry2} from "sanctuary"

/**
 * @readonly
 * @enum { number }
 */
export const MsgType = Object.freeze({})

/**
 * @typedef Msg
 * @property { MsgType } msg
 * @property { any } msgData
 */

/**
 * @param { Msg } msg 
 * @param { import("./model").Model } model 
 * @returns { import("./model").Model }
 */
function updateFn(msg, model) {
  return model;
}

export const update = curry2(updateFn)