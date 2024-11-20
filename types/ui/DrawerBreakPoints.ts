export type BottomDrawerState = 'expanded' | 'quarter' | 'half' | 'collapsed';

export type DrawerBreakPoints = Partial<Record<BottomDrawerState, number>>;