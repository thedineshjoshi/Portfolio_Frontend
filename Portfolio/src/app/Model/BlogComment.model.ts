export interface BlogComment{
    id? :string,
    name:string,
    email:string,
    content:string,
    postedAt:Date,
    blogId?: string;
}