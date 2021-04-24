/// <reference types="react" />

declare module "dspUtils/UserPostListExample" ;

declare module "dspWidgets/W1";
declare module "dspWidgets/Widgets";
declare module "dspWidgets/Examples" ;

declare module "dspWidgets/HelloLink1" {
  const HelloLink1: React.ComponentType;
  export default HelloLink1;
}

declare module "dspWidgets/HelloButton1" {
  const HelloButton1: React.ComponentType;
  export default HelloButton1;
}

/*
import Hello2 from "./../../widgets/lib/example/Hello2";
import Hello3 from "./../../widgets/lib/example/Hello3";
declare module "dspWidgets/Examples" {
  export { Hello2 };
  export { Hello3 };
}
declare module "dspWidgets/Examples" {
  const H: typeof Hello3;
  export default H;
}
*/

declare module '@datalayer/dsp-utils/lib/example/UserPostListExample';

declare module "dspUtils/UserPostListExample" {
  const UserPostListExample: React.ComponentType;
  export default UserPostListExample;
}
