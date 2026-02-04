export default abstract class FetchTemplateFactory {
  protected factoryCID = '';

  public async getFactoryCID(): Promise<string> {
    if (this.factoryCID) return this.factoryCID;
    const fetchedFactoryCID = await this.fetchFactoryCID();
    if (fetchedFactoryCID) this.factoryCID = fetchedFactoryCID;
    else this.factoryCID = await this.createFactory();
    return this.factoryCID;
  }

  protected abstract fetchFactoryCID(): Promise<string>;
  protected abstract createFactory(): Promise<string>;
}
