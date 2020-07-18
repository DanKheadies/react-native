class User {
    constructor(
        id, 
        email, 
        permission,
        userId
    ) {
        this.id = id;
        this.email = email;
        this.permission = permission;
        this.userId = userId;
    }
}

export default User;