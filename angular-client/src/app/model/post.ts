import { Showdown } from 'showdown';
import { User } from './user';
import { Serializable } from './serializable';

export class Post implements Serializable<Post> {
    _id: String;
    title: String;
    content: String;
    tags: [String];
    created_at: Date;
    updated_at: Date;
    user: User;

    public getContentHtml()
    {
        var showdown = new Showdown();
        return showdown.convert(this.content);
    }

    deserialize(input) {
        this._id = input._id;
        this.title = input.title;
        this.content = input.content;
        this.tags = input.tags;
        this.created_at = input.created_at;
        this.updated_at = input.updated_at;
        this.user = new User().deserialize(input.user);

        return this;
    }
}