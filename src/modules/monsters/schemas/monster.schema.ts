import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { monsterGender, monsterTitle, monsterNationality } from "../enums";

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
    description: String;

    @Prop({type: String, enum: monsterNationality, required: true })
    nationality: monsterNationality[];

    @Prop()
    imageUrl: String;

    @Prop({ required: true })
    goldBalance: Number;

    @Prop({ required: true })
    speed: Number;

    @Prop({ required: true })
    Health: Number;

    @Prop()
    secretNotes: String;

    @Prop()
    monsterPassword: String;

}


export const monsterSchema = SchemaFactory.createForClass(Monster).index({firstName: 1, lastName: 1}, {unique: true});