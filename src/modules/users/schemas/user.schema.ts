import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { userRole } from "../roles.enum";
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ collection: 'users' })
export class User {
    id: string;
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({type:Array, enum:userRole, default: [userRole.EMPLOYEE]})
    roles: userRole[];

}

export const userSchema = SchemaFactory.createForClass(User).index({username: 1}, {unique: true});

userSchema.plugin(mongoosePaginate);


