export interface PaginationInterface{
    currentPage: number,
    pageSize: number,
    totalElements: number,
    totalPages: number
}

export interface AllResponsesDto<T = any>{
    pagination:PaginationInterface,
    data:T[]
}