import { User, Role } from './model';

export class Subordinates {
    private users: User[];
    private roles: Role[];

    constructor() {
        this.users = [];
        this.roles = [];
    }

    /**
     * @param {Role} roleParam
     * a function to get subordinate ids based from the user's role
     */
    private getSubordinateRolesIds = (roleParam: Role): number[] => {
        
        // if role parent is 0 then it is admin, meaning everyone are its subordinate
        if (roleParam.Parent === 0) {
            return this.roles
                    .filter( (role: Role) => role.Parent !== 0)
                    .map( (role: Role) => role.Id);
        }

        // if role parent is NOT 0 then get its subordinates
        return this.roles
                .filter( (role: Role) => role.Parent === roleParam.Id)
                .map( (role: Role) => role.Id);
    }
    /**
     * setUsers
     * @param {Array<User>} users 
     * Set users list
     */
    public setUsers(users: User[]) {
        this.users = users;
    }

    /**
     * Sets roles list
     * @param {Array<Role>} roles 
     */
    public setRoles(roles: Role[]) {
        this.roles = roles;
    }

    /**
     * Get user subordinates by user id
     * @param {number} userId 
     * - returns user's subordinates
     */
    public getSubOrdinates(userId: number): User[] {
        // get the user from the user list
        const user = this.users.find((user: User) => user.Id === userId);

        // throw error if user is not found
        if (!user) {
            throw new Error('USER NOT FOUND');
        }

        // get the user role object
        const userRole = this.roles.find( (role: Role) => role.Id === user.Role );

        // throw error if role is not found
        if (!userRole) {
            throw new Error('ROLE NOT FOUND')
        }

        // get array of subordinates role id
        const subordinatesRolesIds: number[] = this.getSubordinateRolesIds(userRole);

        // get user subordinates that matches the role id
        const userSubordinates: User[] = this.users.filter( (user: User) => subordinatesRolesIds.includes(user.Role));

        return userSubordinates;
    }
}


