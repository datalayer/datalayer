import React from 'react';
import Notebook, {
  Cells,
  CodeCell,
  MarkdownCell,
  RawCell
} from "@nteract/stateful-components";

const NteractExample = () =>{
    return <Notebook contentRef="notebook">
      <MarkdownCell id="cellId-md" contentRef="contentRef-md" />
      <Cells contentRef="cells">
        {{
          markdown: <MarkdownCell id="cellId-md" contentRef="contentRef-md" />,
          code: <CodeCell id="cellId-code" contentRef="contentRef-code" />,
          raw: <RawCell id="cellId-raw" contentRef="contentRef-raw" />
        }}
      </Cells>
    </Notebook>    
}

export default NteractExample;
