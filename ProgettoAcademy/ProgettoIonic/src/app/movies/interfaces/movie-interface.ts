export interface MovieRatingInterface {
    averageRating:number,
    numVotes:number
}

export interface MovieCountriesInterface{
    title:string,
    region:string,
    language:string
}

export interface MovieCastInterface {
    celebrityId:string,
    celebrityName:string,
    movieId:string,
    movieTitle:string,
    category:string,
    characters?:string
}

export interface MovieInterface{
    id:string,
    title:string,
    genres:string,
    year:number,
    runningTime:number,
    cast?:MovieCastInterface[],
    rating:MovieRatingInterface,
    countries?:MovieCountriesInterface[]

}

export interface MovieFormInterface {
    id:string,
    title:string,
    genres:string,
    year:number,
    runningTime:number,
    averageRating:number,
    numVotes:number
}

export interface PaginationInterface{
    currentPage: number,
    pageSize: number,
    totalElements: number,
    totalPages: number
}

export interface AllMoviesDtoInterface{
    pagination:PaginationInterface,
    movies:MovieInterface[]
}