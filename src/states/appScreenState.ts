import {BehaviorSubject} from 'rxjs/index';
import {generateSubscriptionStateHook} from '../utils/generateSubscriptionStateHook';
import {ScreenType} from '../constants/ScreenType';

export const defaultAppScreenState = {
  screen: ScreenType.game,
  boundsMainCar: {},
  endGame: null,
  coinCount: 0,
  pause: false,
  speed: 5,
  disableControls: false,
  timeout: false,
};


interface IAppGameState {
  screen: ScreenType.game;
}

export type IAppScreenStateData = IAppGameState;

export const appScreenState$ = new BehaviorSubject(defaultAppScreenState);

export const setAppScreenState = (data: Partial<typeof defaultAppScreenState>) => {
  appScreenState$.next({
    ...appScreenState$.value,
    ...data,
  });
};

export const useAppScreenState = generateSubscriptionStateHook<any, typeof defaultAppScreenState>(
  appScreenState$,
  appScreenState$.value,
);
