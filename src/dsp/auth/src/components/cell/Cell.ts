import { LuminoAdapter } from '@jupyter-react/lumino-adapter/lib';
import { tellActions } from './../../state/tell';
import CellLumino from './CellLumino';

class Cell extends LuminoAdapter<any> {
  private cellLumino: CellLumino;

  constructor(props: { dispatch: any, source: string }) {
    super(props);

    this.cellLumino = new CellLumino(props.source, props.dispatch);
    this.widget = this.cellLumino.getCellPanel();

    this.cellLumino.getCodeCell().model.value.changed.connect((sender, _) => {
      props.dispatch(tellActions.update.started({
        source: sender.text,
      }));
    });

    const mutationCallback: MutationCallback = (mutationList, observer) => {
      mutationList.forEach( (mutation: MutationRecord) => {
        switch(mutation.type) {
          case 'childList':
            break;
          case 'attributes':
            let sum = 0;
            const inputWrapper = document.getElementsByClassName('jp-Cell-inputWrapper');
            if (inputWrapper.length > 0) {
              const i = window.getComputedStyle(inputWrapper[0]);
              sum = sum + Number(i.getPropertyValue('height').replace('px', ''));
            }
            const outputWrapper = document.getElementsByClassName('jp-Cell-outputWrapper');
            if (outputWrapper.length > 0) {
              const o = window.getComputedStyle(outputWrapper[0]);
              sum = sum + Number(o.getPropertyValue('height').replace('px', ''));
            }
            const height = (sum + 10).toString() + 'px';
            this.cellLumino.getCodeCell().node.style.height = height;
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
    const node = this.cellLumino.getCodeCell().node;
    observer.observe(node, observerOptions);

  }

}

export default Cell;
