export type User = {
    Id: number;
    Name: string;
    Role: number;
}

export type Role = {
    Id: number;
    Name: string;
    Parent: number;
}