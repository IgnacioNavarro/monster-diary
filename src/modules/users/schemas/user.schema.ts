import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { userRole } from "../roles";

@Schema({ collection: 'users' })
export class User {
    id: string;
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({type:String, enum:userRole, required: true })
    role: userRole;

}

export const userSchema = SchemaFactory.createForClass(User).index({username: 1}, {unique: true});


