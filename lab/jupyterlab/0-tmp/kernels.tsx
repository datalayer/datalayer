import * as React from '../../node_modules/@types/react';
import { DefaultButton, IButtonProps } from '../../node_modules/office-ui-fabric-react/lib/Button';
import { TeachingBubble } from '../../node_modules/office-ui-fabric-react/lib/TeachingBubble';

export
interface IProps {
}

export
interface IState {
  isTeachingBubbleVisible?: boolean;
}

export
class Kernels extends React.Component<IProps, IState> {
  private _menuButtonElement: HTMLElement;

  constructor(props: IProps) {
    super(props)
    this._onDismiss = this._onDismiss.bind(this);
    this.state = {
      isTeachingBubbleVisible: false
    };
  }

  render() {
    const { isTeachingBubbleVisible } = this.state;
    const examplePrimaryButton: IButtonProps = {
      children: 'Try it out'
    };
    const exampleSecondaryButtonProps: IButtonProps = {
      children: 'Maybe later'
    };
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        padding: '10px'
        }}>
        <div className="ms-slideDownIn20" style={{ height: "100vh" }}>
          <div className="ms-font-su">Kernels</div>
          <span className='ms-TeachingBubbleBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton! }>
          <DefaultButton
            onClick={ this._onDismiss }
            text={ isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble' }
          />
          </span>
          { isTeachingBubbleVisible ? (
          <div>
            <TeachingBubble
              targetElement={ this._menuButtonElement }
              primaryButtonProps={ examplePrimaryButton }
              secondaryButtonProps={ exampleSecondaryButtonProps }
              onDismiss={ this._onDismiss }
              headline='Discover what’s trending around you'
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?
            </TeachingBubble>
          </div>
        ) : (null) }
        </div>
      </div>
    );
  }

  private _onDismiss(ev: any) {
    this.setState({
      isTeachingBubbleVisible: !this.state.isTeachingBubbleVisible
    });
  }

}
