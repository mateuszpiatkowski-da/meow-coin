const instances = new Map<Function, any>();

export default abstract class Singleton {
  protected constructor() {}

  public static getInstance<T extends Singleton>(this: new () => T): T {
    if (!instances.has(this)) {
      instances.set(this, new this());
    }

    return instances.get(this) as T;
  }
}
