import {Observable} from 'rxjs';
import {useState, useLayoutEffect} from 'react';
import {map, distinctUntilChanged} from 'rxjs/internal/operators';

export const generateSubscriptionStateHook = <R, T>(stream$: Observable<T>, initial: T) => <R extends unknown>(
  attr?: keyof T,
) => {
  const [state, setState] = useState<R>(((attr ? initial[attr] : initial) as unknown) as R);

  useLayoutEffect(() => {
    const subscription = stream$
      .pipe(
        map<T, R>(a => ((attr ? a[attr] : a) as unknown) as R),
        distinctUntilChanged(),
      )
      .subscribe(setState);

    return () => subscription.unsubscribe();
  }, [attr]);

  return state;
};
