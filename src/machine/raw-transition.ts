import { StateData } from './state-data';

export interface Transition<T> {
  getTransitionName(): string;
  getDestinationState(): string;
  trigger(currentState: StateData<T>, $event: any): StateData<T>;
}

export type TransitionAction<T> = (current: T | undefined | null) => T | undefined | null;

export const noopTransitionTrigger = <T>(a: T | null | undefined) => a;

export class RawMachineTransition<T> implements Transition<T> {
  private readonly transitionName: string;
  private readonly nextState: string;
  private readonly onTrigger: TransitionAction<T>;

  constructor(
    transitionName: string,
    nextState: string,
    onTransitionTrigger: TransitionAction<T> = noopTransitionTrigger,
  ) {
    this.transitionName = transitionName;
    this.nextState = nextState;
    this.onTrigger = onTransitionTrigger;
  }

  public trigger(currentState: StateData<T>, $event: any): StateData<T> {
    const data = this.onTrigger ? this.onTrigger(currentState.data) : currentState.data;
    return { name: this.nextState, data };
  }

  public getDestinationState(): string {
    return this.nextState;
  }

  public getTransitionName(): string {
    return this.transitionName;
  }
}
