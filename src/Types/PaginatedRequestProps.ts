class PaginatedRequestProps {
  pageIndex: number;
  pageSize: number;
  orderBy?: string;

  constructor(props?: PaginatedRequestProps) {
    this.pageIndex = props?.pageIndex ?? 0;
    this.pageSize = props?.pageSize ?? 10;
    this.orderBy = props?.orderBy ?? "";
  }
}

export default PaginatedRequestProps;
