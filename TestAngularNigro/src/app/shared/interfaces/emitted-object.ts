export enum Actions{
    Detail,
    Delete,
    Create,
    Edit
}

export interface EmittedObject{
    id : number|0,
    actionSelected : Actions
}