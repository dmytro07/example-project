import { AppAbility } from './casl-abilibty.factory';

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = PolicyHandlerCallback;
