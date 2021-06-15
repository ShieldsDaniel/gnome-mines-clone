// @ts-check
import { curry2 } from "sanctuary";
import { div } from "./dom";

/**
 * @param { (msg: import("./update").Msg) => void } dispatch 
 * @param { import("./model").Model } model 
 * @returns { import("virtual-dom").VNode }
 */
function viewFn(dispatch, model) {
  return div ({}) ("Test")
}

export const view = curry2 (viewFn)
