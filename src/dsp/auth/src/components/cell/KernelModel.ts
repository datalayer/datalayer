import { ISessionContext } from '@jupyterlab/apputils';
import { IOutput } from '@jupyterlab/nbformat';
import { Kernel, KernelMessage } from '@jupyterlab/services';
import { ISignal, Signal } from '@lumino/signaling';
import { tellActions } from '../../state/tell';

class KernelModel {
  constructor(session: ISessionContext, dispatch: any) {
    this._sessionContext = session;
    this._dispatch = dispatch;
  }

  get future(): Kernel.IFuture<
    KernelMessage.IExecuteRequestMsg,
    KernelMessage.IExecuteReplyMsg
  > | null {
    return this._future;
  }

  set future(
    value: Kernel.IFuture<
      KernelMessage.IExecuteRequestMsg,
      KernelMessage.IExecuteReplyMsg
    > | null
  ) {
    this._future = value;
    if (!value) {
      return;
    }
    value.onIOPub = this._onIOPub;
  }

  get output(): IOutput | null {
    return this._output;
  }

  get stateChanged(): ISignal<KernelModel, void> {
    return this._stateChanged;
  }

  execute(code: string): void {
    if (!this._sessionContext || !this._sessionContext.session?.kernel) {
      return;
    }
    this.future = this._sessionContext.session?.kernel?.requestExecute({
      code
    });
  }

  private _onIOPub = (msg: KernelMessage.IIOPubMessage): void => {
    const msgType = msg.header.msg_type;
    this._dispatch(tellActions.update.started({
      kernelAvailable: true,
    }));
    switch (msgType) {
      case 'execute_result':
        break;
      case 'display_data':
        break;
      case 'update_display_data':
        this._output = msg.content as IOutput;
        console.log(this._output);
        this._stateChanged.emit();
        break;
      default:
        break;
    }
    return;
  };

  private _future: Kernel.IFuture<
    KernelMessage.IExecuteRequestMsg,
    KernelMessage.IExecuteReplyMsg
  > | null = null;
  private _output: IOutput | null = null;
  private _sessionContext: ISessionContext;
  private _dispatch: any;
  private _stateChanged = new Signal<KernelModel, void>(this);
}

export default KernelModel;
