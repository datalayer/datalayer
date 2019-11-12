import * as React from 'react'
import { Card } from '@uifabric/react-cards'
import { Persona } from '@uifabric/experiments/lib/Persona'
import { Text } from '@uifabric/experiments/lib/Text'
import { Icon, Image, Stack } from 'office-ui-fabric-react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

export default class Welcome extends React.Component<any, any> {
  public constructor(props) {
    super(props)
  }

  public render() {
    const { card } = this.props
    const styles = mergeStyleSets({
      textLarge: {
        color: 'teal',
        fontWeight: 'bolder'
      },
      textBold: {
        fontWeight: 'bold'
      }
    })
    return (
      <Card>
{/*
        <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" coin={{ imageUrl: PersonaTestImages.personMale }} />
*/}
        <Persona 
          text={card.user_display_name} 
          secondaryText={card.date} 
          imageUrl={card.tweet_user_picto_url }
/*
          coin={{ 
            image: {
              src: card.tweet_user_picto_url 
            }
          }} 
*/
          />
        <Card.Item 
//          disableChildPadding
        >
        {
          (card.tweet_capture && card.tweet_capture.length > 0) &&
          <Image
            src={ 'data:image/png;base64,' + card.tweet_capture }
//            width="100%"
            width="250px"
            height={ Math.floor(card.tweet_capture_height / card.tweet_capture_width * 250) + "px" }
          />
        }
        </Card.Item>
{/*
        <Text variant="large" className={styles.textLarge}>
          <a href={ "https://twitter.com/" + card.tweet_user_screen_name + "/status/" + card.tweet_id } target="_blank">Tweet</a>
        </Text>
*/}
        <Text variant="large">
          {card.tweet_text}
        </Text>
{/*
        <Text className={styles.textBold}>
          Is this helpful?
        </Text>
*/}
        <Card.Item 
//          disableChildPadding
          >
          <Stack
            horizontal
            horizontalAlign="space-between"
            padding="10px 10px -2px 10px"
            styles={{ root: { borderTop: '1px solid lightgray' } }}
          >
            <Icon iconName="RedEye" styles={{ root: { color: 'mediumturquoise', fontSize: '20px' } }} />
            <Icon iconName="MoreVertical" styles={{ root: { color: 'mediumturquoise', fontSize: '20px' } }} />
          </Stack>
        </Card.Item>
      </Card>

  )
  }

}
