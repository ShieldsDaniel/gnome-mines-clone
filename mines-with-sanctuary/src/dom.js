// @ts-check
import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import * as S from "sanctuary"

let elements = hh(h)

/**
 * @type { import("hyperscript-helpers").HyperScriptHelperFn }
 */
export const div = S.curry2 (elements.div)
