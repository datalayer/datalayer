import * as React from 'react'

//export const NODE_ID = "id"
export const NODE_ID = "noteId"

export const EMPTY_TYPE = "empty"
export const STANDARD_TYPE = "standard" 
export const STANDARD_CHILD_SUBTYPE = "standardChild"

export const EMPTY_EDGE_TYPE = "emptyEdge"
export const STANDARD_EDGE_TYPE = "standardEdge"

const EmptyNode = (
  <symbol viewBox="0 0 100 100" id="empty" key="0">
    <circle cx="50" cy="50" r="45"></circle>
  </symbol>
)
const StandardNode = (
  <symbol viewBox="0 0 100 100" id="standard" key="1">
    <rect transform="translate(50) rotate(45)" width="70" height="70" fill="rgba(30, 144, 255, 0.12)"></rect>
  </symbol>
)
const StandardChildNode = (
  <symbol viewBox="0 0 100 100" id="standardChild" key="0">
    <rect x="2.5" y="0" width="95" height="97.5" fill="rgba(30, 144, 255, 0.12)"></rect>
  </symbol>
)
const EmptyEdge = (
  <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
    <circle cx="25" cy="25" r="8" fill="currentColor"></circle>
  </symbol>
)
const StandardEdge = (
  <symbol viewBox="0 0 50 50" id="standardEdge" key="1">
    <rect transform="rotate(45)"  x="25" y="-4.5" width="15" height="15" fill="currentColor"></rect>
  </symbol>
)

export default {
  NodeTypes: {
    empty: {
      typeText: "",
      shapeId: "#empty",
      shape: EmptyNode
    },
    standard: {
      typeText: "",
      shapeId: "#standard",
      shape: StandardNode
    }
  },
  NodeSubtypes: {
    standardChild: {
      shapeId: "#standardChild",
      shape: StandardChildNode
    }
  }, 
  EdgeTypes: {
    emptyEdge: {
      shapeId: "#emptyEdge",
      shape: EmptyEdge
    },
    standardEdge: {
      shapeId: "#standardEdge",
      shape: StandardEdge
    }
  }

}
