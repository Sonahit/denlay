import { Type } from '../types/index';

export abstract class Container {
  static _instance: any;
  /**
   * @internal
   */
  static _instances: Record<string | symbol, any> = {};

  static get<T>(abstract: string | symbol | Type<any>): T {
    return this._instances[abstract.toString()];
  }

  static setInstance<T>(concrete: T): void {
    this._instance = concrete;
  }

  static getInstance<T>(): T {
    return this._instance;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static bind<T>(abstract: string | symbol | Type<any>, concrete: T): void {
    this._instances[abstract.toString()] = concrete;
  }
}
