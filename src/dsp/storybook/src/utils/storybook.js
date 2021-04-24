import set from 'lodash/set';

export function docs(component, description) {
  set(component, 'story.parameters.docs.storyDescription', description);
  return component;
}
