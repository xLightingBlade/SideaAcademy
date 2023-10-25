export interface CelebrityMoviesInterface {
    celebrityId:string,
    celebrityName:string,
    movieId:string,
    movieTitle:string,
    category:string,
    characters?:string
}

export interface CelebrityInterface{
    id:string,
    name:string,
    birthYear:number,
    deathYear:number|null;
    movies:CelebrityMoviesInterface[],

}

export interface PaginationInterface{
    currentPage: number,
    pageSize: number,
    totalElements: number,
    totalPages: number
}

export interface AllCelebritiesDtoInterface{
    pagination:PaginationInterface,
    celebrities:CelebrityInterface[]
}