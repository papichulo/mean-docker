import { Serializable } from './serializable';

export class User implements Serializable<User> {
    _id: String;
    name: String;
    email: String;
    password: String;
    admin: boolean;

    deserialize(input) {
        this._id = input._id;
        this.name = input.name;
        this.email = input.email;
        // this.password = input.password; Do not get the password unless necessary
        this.admin = input.admin;

        return this;
    }
}