import { Paginated } from "./PaginatedResponse";

class ReturnObject<T> {
  public IsOk: boolean;
  public Message: string;
  public Entity: T | undefined;
  public Paginated: Paginated<T> | undefined;
  public Code: number;

  constructor() {
    this.IsOk = false;
    this.Message = "";
    this.Entity = undefined;
    this.Paginated = undefined;
    this.Code = 0;
  }
}
