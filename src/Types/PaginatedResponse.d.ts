export class Paginated<T> {
  public pageNumber: number;
  public pageSize: number;
  public totalCount: number;
  public totalPages: number;
  public totalFiltered: number;
  public entities: Array<T>;

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 10;
    this.totalCount = 0;
    this.entities = [];
    this.totalPages = 0;
    this.totalFiltered = 0;
  }
}
