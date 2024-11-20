import { DrawerBreakPoints } from '../ui';

export type DrawerStateType = {
  visible: boolean;
  content?: React.ReactNode;
  breakPoints: DrawerBreakPoints;
};
