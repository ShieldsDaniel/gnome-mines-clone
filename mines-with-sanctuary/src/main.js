// @ts-check
import { diff, patch } from "virtual-dom"
import createElement from "virtual-dom/create-element"
import * as S from "sanctuary"
import { view } from "./view"
import { update } from "./update"
import { initModel } from "./model"

/**
 * @returns { void }
 */
export function main() {
  const node = document.getElementById("app")
  /** @type { import("./model").Model } */
  let model = initModel
  /** @type { import("virtual-dom").VNode } */
  let currentView
  /** @type { Element } */
  let rootNode = createElement (currentView);
  /** @type { HTMLElement } */
  node.appendChild (rootNode)

  /**
   * @param { import("./update").Msg } msg 
   * @returns { void }
   */
  function dispatch(msg) {
    model = update (msg) (model)
    const updatedView = view (dispatch) (model)
    const patches = S.curry2 (diff) (currentView) (updatedView)
    rootNode = S.curry2 (patch) (rootNode) (patches)
    currentView = updatedView
  }
}
