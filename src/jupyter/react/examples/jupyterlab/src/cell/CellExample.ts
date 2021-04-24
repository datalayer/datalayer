import { LuminoAdapter } from '@jupyter-react/lumino-adapter/lib';
import cellLumino from './CellLumino';

class CellExample extends LuminoAdapter<any> {

  constructor(props: any) {
    super(props);
    this.widget = cellLumino.cellPanel
    const mutationCallback: MutationCallback = (mutationList, observer) => {
      mutationList.forEach( (mutation: MutationRecord) => {
        switch(mutation.type) {
          case 'childList':
            break;
          case 'attributes':
            const inputWrapper = document.getElementsByClassName('jp-Cell-inputWrapper');
            const i = window.getComputedStyle(inputWrapper[0]);
            const outputWrapper = document.getElementsByClassName('jp-Cell-outputWrapper');
            const o = window.getComputedStyle(outputWrapper[0]);
            const sum = (Number(i.getPropertyValue('height').replace('px', ''))) + (Number(o.getPropertyValue('height').replace('px', '')));    
            const height = (sum + 10).toString() + 'px';
            cellLumino.codeCell.node.style.height = height;
            const heightPlus = (sum + 50).toString() + 'px';
            this.setState({ height: heightPlus });
            break;
          }
      });
    }
    const observerOptions = {
      childList: false,
      attributes: true,
      subtree: true,
    }
    const observer = new MutationObserver(mutationCallback)
    const node = cellLumino.codeCell.node;
    observer.observe(node, observerOptions);
  }
}

export default CellExample;
