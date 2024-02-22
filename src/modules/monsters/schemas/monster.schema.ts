import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { monsterGender, monsterTitle, monsterNationality, monsterVotes } from "../utils";

import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ collection: 'monsters' })
export class Monster {
    id: string;
    @Prop({ required: true })
    firstName: string;
  
    @Prop({ required: true })
    lastName: string;
  
    @Prop({type: String, enum: monsterTitle, required: true })
    title: monsterTitle;

    @Prop({type: String, enum: monsterGender, required: true })
    gender: monsterGender;

    @Prop({ required: true })
    description: string;

    @Prop({
        type: Array,
        enum: monsterNationality,
        required: true
    })
    nationality: monsterNationality[];

    @Prop()
    imageUrl: string;

    @Prop({ required: true })
    goldBalance: number;

    @Prop({ required: true })
    speed: number;

    @Prop({ required: true })
    Health: number;

    @Prop()
    secretNotes: string;

    @Prop()
    monsterPassword: string;

    @Prop()
    votes: string[];


}




export const monsterSchema = SchemaFactory.createForClass(Monster).index({firstName: 1, lastName: 1}, {unique: true});

monsterSchema.plugin(mongoosePaginate);