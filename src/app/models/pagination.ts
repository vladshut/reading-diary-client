import {Expose, Type} from "class-transformer";

class PaginationMeta {
  current_page: number;
  last_page: number
  per_page: number
  total: number;
  from: number;
  to: number;
}

export class Pagination<T> {
  @Type(() => PaginationMeta)
  meta: PaginationMeta;
  @Type((options) => (options.newObject as Pagination<T>).relatedObjectType)
  data: Array<T>;

  @Expose() private relatedObjectType?: Function;

  constructor(relatedObjectType: Function) {
    this.relatedObjectType = relatedObjectType;
  }

  paginate() {
    return { itemsPerPage: this.per_page , currentPage: this.current_page, totalItems: this.total };
  }

  get current_page(): number {
    return this.meta.current_page;
  }

  get last_page() : number {
    return this.meta.last_page;
  }

  get per_page(): number {
    return this.meta.per_page;
  }

  get total(): number {
    return this.meta.total;
  }

  get from(): number {
    return this.meta.from;
  }

  get to() : number {
    return this.meta.to;
  }
}
