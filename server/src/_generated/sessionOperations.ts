/*
    Automaticky generovany soubor!
*/
/* tslint:disable */
/* eslint-disable */
import yup from '@/utils/ValidationService';
import { RESTRequestType } from '@/types/RestAPIGenerator/RESTRequestType';
import { COREFormFieldType } from '@/types/RestAPIGenerator/COREFormFieldType';
import { COREFormInputTypeEnum, COREInputTypeEnum } from '@/types/enums';
import { AnyTypeValidation, IAnyType } from '@/types/IAnyType';
import dayjs from 'dayjs';
import { ExpressRouteType } from '@/resolvers/expressResolver';
import { LocalResolverType } from '@/resolvers/expressTypeResolver';

let faker;

if (process.env.NODE_ENV === 'development') {
  // Import faker only in development
  faker = require('@faker-js/faker').faker;
} else {
  // Do something else or nothing in production
  faker = {
    // Provide dummy or no-op functions for production
    fakeData: () => {},
    // ...
  };
}

const globalPath = '';
export interface GlobalStorageDataType {
        ForgotPasswordEmail?: IForgotPasswordEmail
        TokenPassword?: ITokenPassword
        UserRegister?: IUserRegister
        Grid?: IGrid
        Limits?: ILimits
        LevelGroup?: ILevelGroup
        Level?: ILevel
        UserLogin?: IUserLogin
        LevelStats?: ILevelStats
        GameResult?: IGameResult
        LevelProgress?: ILevelProgress
        UserSession?: IUserSession
        UserSessionDB?: IUserSessionDB
        LevelStatsDB?: ILevelStatsDB
        UserProfile?: IUserProfile
        TokenBody?: ITokenBody
        ProviderSetupBase?: IProviderSetupBase
};

const ForgotPasswordEmailValidation = ()=>({
   email: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

});
export interface IForgotPasswordEmail {
email: string
}


const ForgotPasswordEmailForm = ()=>({
        email: {
            id: 'email',
            label: ``,
            formId: 'ForgotPasswordEmailForm',
            maxLength: parseInt(``) || undefined,
        }, 

});


const TokenPasswordValidation = ()=>({
   token: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   password: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

});
export interface ITokenPassword {
token: string
password: string
}


const TokenPasswordForm = ()=>({
        token: {
            id: 'token',
            label: ``,
            formId: 'TokenPasswordForm',
            maxLength: parseInt(``) || undefined,
        }, 

        password: {
            id: 'password',
            label: ``,
            formId: 'TokenPasswordForm',
            maxLength: parseInt(``) || undefined,
        }, 

});


const UserRegisterValidation = ()=>({
   email: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   username: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   password: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   userId: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

});
export interface IUserRegister {
email: string
username?: string
password: string
userId: string
}


const UserRegisterForm = ()=>({
        email: {
            id: 'email',
            label: ``,
            formId: 'UserRegisterForm',
            maxLength: parseInt(``) || undefined,
        }, 

        username: {
            id: 'username',
            label: ``,
            formId: 'UserRegisterForm',
            maxLength: parseInt(``) || undefined,
        }, 

        password: {
            id: 'password',
            label: ``,
            formId: 'UserRegisterForm',
            maxLength: parseInt(``) || undefined,
        }, 

        userId: {
            id: 'userId',
            label: ``,
            formId: 'UserRegisterForm',
            maxLength: parseInt(``) || undefined,
        }, 

});


const GridValidation = ()=>({
   x: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   y: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

});
export interface IGrid {
x?: number
y?: number
}


const GridForm = ()=>({
        x: {
            id: 'x',
            label: ``,
            formId: 'GridForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        y: {
            id: 'y',
            label: ``,
            formId: 'GridForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

});


const LimitsValidation = ()=>({
   moves: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   time: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   stars: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

});
export interface ILimits {
moves?: number
time?: number
stars?: number
}


const LimitsForm = ()=>({
        moves: {
            id: 'moves',
            label: ``,
            formId: 'LimitsForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        time: {
            id: 'time',
            label: ``,
            formId: 'LimitsForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        stars: {
            id: 'stars',
            label: ``,
            formId: 'LimitsForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

});


const LevelGroupValidation = ()=>({
   id: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   title: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   subtitle: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   levels: yup
    .array()
        .of(yup
            
            .object()
            ),
   image: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

});
export interface ILevelGroup {
id?: number
title?: string
subtitle?: string
levels?: Array<{
     x: number
 y: number
 levelId: string
 label: string
}>
image?: string
}


const LevelGroupForm = ()=>({
        id: {
            id: 'id',
            label: ``,
            formId: 'LevelGroupForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        title: {
            id: 'title',
            label: ``,
            formId: 'LevelGroupForm',
            maxLength: parseInt(``) || undefined,
        }, 

        subtitle: {
            id: 'subtitle',
            label: ``,
            formId: 'LevelGroupForm',
            maxLength: parseInt(``) || undefined,
        }, 

        levels: {
            id: 'levels',
            label: ``,
            formId: 'LevelGroupForm',
            maxLength: parseInt(``) || undefined,
            multi: true,
            item: {"type":"object","required":[],"properties":{"x":{"type":"integer","required":false},"y":{"type":"integer","required":false},"levelId":{"type":"string","required":false},"label":{"type":"string","required":false}}},

        }, 

        image: {
            id: 'image',
            label: ``,
            formId: 'LevelGroupForm',
            maxLength: parseInt(``) || undefined,
        }, 

});


const LevelValidation = ()=>({
   id: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   title: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   characters: yup
    .array()
        .of(yup
            
        .string()
        
        
        .nullable()
        .trim()
            ),
   objective: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   image: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   grid: yup
            
            .object(GridValidation())
        ,

   shifts: yup
    .array()
        .of(yup
            
            .object(GridValidation())
            ),
   limits: yup
    .array()
        .of(yup
            
            .object(LimitsValidation())
            ),
});
export interface ILevel {
id?: number
title?: string
characters?: Array<string>
objective?: string
image?: string
grid?: IGrid
shifts?: Array<IGrid>
limits?: Array<ILimits>
}


const LevelForm = ()=>({
        id: {
            id: 'id',
            label: ``,
            formId: 'LevelForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        title: {
            id: 'title',
            label: ``,
            formId: 'LevelForm',
            maxLength: parseInt(``) || undefined,
        }, 

        characters: {
            id: 'characters',
            label: ``,
            formId: 'LevelForm',
            maxLength: parseInt(``) || undefined,
            multi: true,
            item: {"type":"string"},

        }, 

        objective: {
            id: 'objective',
            label: ``,
            formId: 'LevelForm',
            maxLength: parseInt(``) || undefined,
        }, 

        image: {
            id: 'image',
            label: ``,
            formId: 'LevelForm',
            maxLength: parseInt(``) || undefined,
        }, 

        grid: GridForm(),

        shifts: {
            id: 'shifts',
            label: ``,
            formId: 'LevelForm',
            maxLength: parseInt(``) || undefined,
            multi: true,
            item: {"type":"object","properties":{"x":{"type":"integer","required":false},"y":{"type":"integer","required":false}},"typeOf":"schemas","fileName":"session.yaml","key":"Grid","reference":"Grid","$ref":"#/components/schemas/Grid","required":[]},

        }, 

        limits: {
            id: 'limits',
            label: ``,
            formId: 'LevelForm',
            maxLength: parseInt(``) || undefined,
            multi: true,
            item: {"type":"object","properties":{"moves":{"type":"integer","required":false},"time":{"type":"integer","required":false},"stars":{"type":"integer","required":false}},"typeOf":"schemas","fileName":"session.yaml","key":"Limits","reference":"Limits","$ref":"#/components/schemas/Limits","required":[]},

        }, 

});


const UserLoginValidation = ()=>({
   username: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   password: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

});
export interface IUserLogin {
username: string
password: string
}


const UserLoginForm = ()=>({
        username: {
            id: 'username',
            label: ``,
            formId: 'UserLoginForm',
            maxLength: parseInt(``) || undefined,
        }, 

        password: {
            id: 'password',
            label: ``,
            formId: 'UserLoginForm',
            maxLength: parseInt(``) || undefined,
        }, 

});


const LevelStatsValidation = ()=>({
   levelId: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   moves: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   completed: yup
            
        .boolean()
        ,

   stars: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   time: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   stage: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   scene: yup
            
        .number()
        ,

});
export interface ILevelStats {
levelId: string
moves: number
completed: boolean
stars: number
time: number
stage: string
scene: number
}


const LevelStatsForm = ()=>({
        levelId: {
            id: 'levelId',
            label: ``,
            formId: 'LevelStatsForm',
            maxLength: parseInt(``) || undefined,
        }, 

        moves: {
            id: 'moves',
            label: ``,
            formId: 'LevelStatsForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        completed: {
            id: 'completed',
            label: ``,
            formId: 'LevelStatsForm',
            maxLength: parseInt(``) || undefined,
            input: COREFormInputTypeEnum.Checkboxes,
            options: [
                {
                    label: 'TRUE',
                    value: true,
                    negative: false,
                }
            ],

        }, 

        stars: {
            id: 'stars',
            label: ``,
            formId: 'LevelStatsForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        time: {
            id: 'time',
            label: ``,
            formId: 'LevelStatsForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        stage: {
            id: 'stage',
            label: ``,
            formId: 'LevelStatsForm',
            maxLength: parseInt(``) || undefined,
        }, 

        scene: {
            id: 'scene',
            label: ``,
            formId: 'LevelStatsForm',
            maxLength: parseInt(``) || undefined,
        }, 

});


const GameResultValidation = ()=>({
   levelId: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   moves: yup
    .array()
        .of(yup
            
            .object(GridValidation())
            ),
   time: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

});
export interface IGameResult {
levelId: string
moves: Array<IGrid>
time: number
}


const GameResultForm = ()=>({
        levelId: {
            id: 'levelId',
            label: ``,
            formId: 'GameResultForm',
            maxLength: parseInt(``) || undefined,
        }, 

        moves: {
            id: 'moves',
            label: ``,
            formId: 'GameResultForm',
            maxLength: parseInt(``) || undefined,
            multi: true,
            item: {"type":"object","properties":{"x":{"type":"integer","required":false},"y":{"type":"integer","required":false}},"typeOf":"schemas","fileName":"session.yaml","key":"Grid","reference":"Grid","$ref":"#/components/schemas/Grid","required":[]},

        }, 

        time: {
            id: 'time',
            label: ``,
            formId: 'GameResultForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

});


const LevelProgressValidation = ()=>({
   levelId: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   moves: yup
    .array()
        .of(yup
            
            .object(GridValidation())
            ),
   completed: yup
            
        .boolean()
        ,

   stars: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   time: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   stage: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   scene: yup
            
        .number()
        ,

});
export interface ILevelProgress {
levelId: string
moves: Array<IGrid>
completed: boolean
stars: number
time: number
stage: string
scene: number
}


const LevelProgressForm = ()=>({
        levelId: {
            id: 'levelId',
            label: ``,
            formId: 'LevelProgressForm',
            maxLength: parseInt(``) || undefined,
        }, 

        moves: {
            id: 'moves',
            label: ``,
            formId: 'LevelProgressForm',
            maxLength: parseInt(``) || undefined,
            multi: true,
            item: {"type":"object","properties":{"x":{"type":"integer","required":false},"y":{"type":"integer","required":false}},"typeOf":"schemas","fileName":"session.yaml","key":"Grid","reference":"Grid","$ref":"#/components/schemas/Grid","required":[]},

        }, 

        completed: {
            id: 'completed',
            label: ``,
            formId: 'LevelProgressForm',
            maxLength: parseInt(``) || undefined,
            input: COREFormInputTypeEnum.Checkboxes,
            options: [
                {
                    label: 'TRUE',
                    value: true,
                    negative: false,
                }
            ],

        }, 

        stars: {
            id: 'stars',
            label: ``,
            formId: 'LevelProgressForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        time: {
            id: 'time',
            label: ``,
            formId: 'LevelProgressForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        stage: {
            id: 'stage',
            label: ``,
            formId: 'LevelProgressForm',
            maxLength: parseInt(``) || undefined,
        }, 

        scene: {
            id: 'scene',
            label: ``,
            formId: 'LevelProgressForm',
            maxLength: parseInt(``) || undefined,
        }, 

});


const UserSessionValidation = ()=>({
   coins: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   current: yup
            
            .object(LevelProgressValidation())
        ,

   previous: yup
    .array()
        .of(yup
            
            .object(LevelStatsValidation())
            ),
});
export interface IUserSession {
coins: number
current?: ILevelProgress
previous: Array<ILevelStats>
}


const UserSessionForm = ()=>({
        coins: {
            id: 'coins',
            label: ``,
            formId: 'UserSessionForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        current: LevelProgressForm(),

        previous: {
            id: 'previous',
            label: ``,
            formId: 'UserSessionForm',
            maxLength: parseInt(``) || undefined,
            multi: true,
            item: {"type":"object","properties":{"levelId":{"type":"string","required":true},"moves":{"type":"integer","required":true},"completed":{"type":"boolean","required":true},"stars":{"type":"integer","required":true},"time":{"type":"integer","required":true},"stage":{"type":"string","required":true},"scene":{"type":"number","required":true}},"required":["levelId","moves","completed","stars","time","stage","scene"],"typeOf":"schemas","fileName":"session.yaml","key":"LevelStats","reference":"LevelStats","$ref":"#/components/schemas/LevelStats"},

        }, 

});


const UserSessionDBValidation = ()=>({
   id: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   created: yup
            
        .date()
        .nullable()
        ,

   userId: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   coins: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   previous: yup
    .array()
        .of(yup
            
            .object(LevelStatsDBValidation())
            ),
});
export interface IUserSessionDB {
id?: string
created?: string
userId: string
coins: number
previous: Array<ILevelStatsDB>
}


const UserSessionDBForm = ()=>({
        id: {
            id: 'id',
            label: ``,
            formId: 'UserSessionDBForm',
            maxLength: parseInt(``) || undefined,
        }, 

        created: {
            id: 'created',
            label: ``,
            formId: 'UserSessionDBForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.dateTime,

        }, 

        userId: {
            id: 'userId',
            label: ``,
            formId: 'UserSessionDBForm',
            maxLength: parseInt(``) || undefined,
        }, 

        coins: {
            id: 'coins',
            label: ``,
            formId: 'UserSessionDBForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        previous: {
            id: 'previous',
            label: ``,
            formId: 'UserSessionDBForm',
            maxLength: parseInt(``) || undefined,
            multi: true,
            item: {"type":"object","properties":{"id":{"type":"string","format":"uuid","required":false},"created":{"type":"string","format":"date-time","required":false},"levelId":{"type":"string","required":true},"movesCount":{"type":"integer","required":false},"completed":{"type":"boolean","required":true},"stars":{"type":"integer","required":true},"time":{"type":"integer","required":true},"stage":{"type":"string","required":true},"scene":{"type":"number","required":true}},"required":["levelId","moves","completed","stars","time","stage","scene"],"typeOf":"schemas","fileName":"session.yaml","key":"LevelStatsDB","reference":"LevelStatsDB","$ref":"#/components/schemas/LevelStatsDB"},

        }, 

});


const LevelStatsDBValidation = ()=>({
   id: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   created: yup
            
        .date()
        .nullable()
        ,

   levelId: yup
            
        .string()
        
        
        .nullable()
        .trim()
        .required((message)=>`${message.path} is required`)
,

   movesCount: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   completed: yup
            
        .boolean()
        .required((message)=>`${message.path} is required`)
,

   stars: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        .required((message)=>`${message.path} is required`)
,

   time: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        .required((message)=>`${message.path} is required`)
,

   stage: yup
            
        .string()
        
        
        .nullable()
        .trim()
        .required((message)=>`${message.path} is required`)
,

   scene: yup
            
        .number()
        .required((message)=>`${message.path} is required`)
,

});
export interface ILevelStatsDB {
id?: string
created?: string
levelId: string
movesCount?: number
completed: boolean
stars: number
time: number
stage: string
scene: number
}


const LevelStatsDBForm = ()=>({
        id: {
            id: 'id',
            label: ``,
            formId: 'LevelStatsDBForm',
            maxLength: parseInt(``) || undefined,
        }, 

        created: {
            id: 'created',
            label: ``,
            formId: 'LevelStatsDBForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.dateTime,

        }, 

        levelId: {
            id: 'levelId',
            label: ``,
            formId: 'LevelStatsDBForm',
            maxLength: parseInt(``) || undefined,
        }, 

        movesCount: {
            id: 'movesCount',
            label: ``,
            formId: 'LevelStatsDBForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        completed: {
            id: 'completed',
            label: ``,
            formId: 'LevelStatsDBForm',
            maxLength: parseInt(``) || undefined,
            input: COREFormInputTypeEnum.Checkboxes,
            options: [
                {
                    label: 'TRUE',
                    value: true,
                    negative: false,
                }
            ],

        }, 

        stars: {
            id: 'stars',
            label: ``,
            formId: 'LevelStatsDBForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        time: {
            id: 'time',
            label: ``,
            formId: 'LevelStatsDBForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        stage: {
            id: 'stage',
            label: ``,
            formId: 'LevelStatsDBForm',
            maxLength: parseInt(``) || undefined,
        }, 

        scene: {
            id: 'scene',
            label: ``,
            formId: 'LevelStatsDBForm',
            maxLength: parseInt(``) || undefined,
        }, 

});


const UserProfileValidation = ()=>({
   id: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   email: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   session: yup
            
            .object(UserSessionValidation())
        ,

});
export interface IUserProfile {
id: string
email: string
session: IUserSession
}


const UserProfileForm = ()=>({
        id: {
            id: 'id',
            label: ``,
            formId: 'UserProfileForm',
            maxLength: parseInt(``) || undefined,
        }, 

        email: {
            id: 'email',
            label: ``,
            formId: 'UserProfileForm',
            maxLength: parseInt(``) || undefined,
        }, 

        session: UserSessionForm(),

});


const TokenBodyValidation = ()=>({
   userId: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   iat: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

   exp: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

});
export interface ITokenBody {
userId: string
iat: number
exp: number
}


const TokenBodyForm = ()=>({
        userId: {
            id: 'userId',
            label: ``,
            formId: 'TokenBodyForm',
            maxLength: parseInt(``) || undefined,
        }, 

        iat: {
            id: 'iat',
            label: ``,
            formId: 'TokenBodyForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

        exp: {
            id: 'exp',
            label: ``,
            formId: 'TokenBodyForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

});


const ProviderSetupBaseValidation = ()=>({
   validSince: yup
            
        .date()
        .nullable()
        ,

   attributes: yup
            
        .string()
        
        
        .nullable()
        .trim()
        ,

   provider: yup
            
        .number()
        .integer((message)=>`${message.path} should be integer`)
        ,

});
export interface IProviderSetupBase {
validSince: string
attributes: string
provider: number
}


const ProviderSetupBaseForm = ()=>({
        validSince: {
            id: 'validSince',
            label: ``,
            formId: 'ProviderSetupBaseForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.dateTime,

        }, 

        attributes: {
            id: 'attributes',
            label: ``,
            formId: 'ProviderSetupBaseForm',
            maxLength: parseInt(``) || undefined,
        }, 

        provider: {
            id: 'provider',
            label: ``,
            formId: 'ProviderSetupBaseForm',
            maxLength: parseInt(``) || undefined,            type: COREInputTypeEnum.number,

        }, 

});

export type GlobalLabelType<T extends object = any> = COREFormFieldType<T>
let GlobalInnerLabels: Record<string, Record<string, GlobalLabelType>> = {};
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError" = "RequiredError";
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

const getPath = (functionName: string, localPath: string, query: any, headers: Array<string>, replacements: Record<string,string>)=>{
    let M = [...localPath.matchAll(/\{(.*?)\}/gmi)];
    let out: any = {
        url: localPath,
        error: undefined,
        params: {},
        headers: {}
    };
    Object.keys(query||{}).map(key=>{
        out.params[replacements[key] || key] = query[key];
    }); 
    for(let i=0; i<M.length; i++){
            if(!query[M[i][1]]) 
                throw new RequiredError(M[i][1], `Required parameter ${M[i][1]} was null or undefined when calling ${functionName}.`);;
            delete out.params[M[i][1]];
            out.url = out.url.replace(M[i][0], query[M[i][1]]);
    }
    headers.map(header=>{
        if(query[header]){
            delete out.params[replacements[header] || header];
            out.headers[replacements[header] || header] = query[header];
        }
    });
    return out;
};


const getUserCallQueryValidation = () => ({
})

const getUserCallQuery = {
}

export interface IgetUserCallQuery {
}
type getUserCallResponse = IUserProfile
    ;

type getUserInnerResponse = getUserCallResponse|'' 

/**
 * 
 * @summary Get user data
 * @param {IgetUserCallQuery} [queryParams] qury parameters required for successfull call
 * @param {*} [options] Override http request option.
 * @throws {RequiredError}
 */
export type IgetUserCallResolver = LocalResolverType<IgetUserCallQuery, undefined, getUserInnerResponse>
const getUserCall = (
        queryParams?: IgetUserCallQuery,
        body?: undefined,
        options: Partial<RESTRequestType> = {}): RESTRequestType<getUserCallResponse> => {
    
    const localVarPath = getPath(`getUser`, `${globalPath}/user`, queryParams || {} , [], {  });

    const localVarRequestOptions = { method: 'get', ...options};

    const requestContentType = undefined

    let innerResponse: getUserCallResponse|undefined 
    
    return {
        name: `getUser`,
        responseType: innerResponse,
        ...localVarRequestOptions,
        ...localVarPath,
        headers: {
            ...(localVarRequestOptions.headers || {}),
            ...(localVarPath.headers || {}),
        },
        data: body,
        requestContentType,
        security: ['bearerAuth',],
    };
}
const deleteUserCallQueryValidation = () => ({
})

const deleteUserCallQuery = {
}

export interface IdeleteUserCallQuery {
}
type deleteUserCallResponse = '';

type deleteUserInnerResponse = deleteUserCallResponse|'' 

/**
 * 
 * @summary Delete user account
 * @param {IdeleteUserCallQuery} [queryParams] qury parameters required for successfull call
 * @param {*} [options] Override http request option.
 * @throws {RequiredError}
 */
export type IdeleteUserCallResolver = LocalResolverType<IdeleteUserCallQuery, undefined, deleteUserInnerResponse>
const deleteUserCall = (
        queryParams?: IdeleteUserCallQuery,
        body?: undefined,
        options: Partial<RESTRequestType> = {}): RESTRequestType<deleteUserCallResponse> => {
    
    const localVarPath = getPath(`deleteUser`, `${globalPath}/user`, queryParams || {} , [], {  });

    const localVarRequestOptions = { method: 'delete', ...options};

    const requestContentType = undefined

    let innerResponse: deleteUserCallResponse|undefined 
    
    return {
        name: `deleteUser`,
        responseType: innerResponse,
        ...localVarRequestOptions,
        ...localVarPath,
        headers: {
            ...(localVarRequestOptions.headers || {}),
            ...(localVarPath.headers || {}),
        },
        data: body,
        requestContentType,
        security: ['bearerAuth',],
    };
}
const updateGameStatusCallQueryValidation = () => ({
})

const updateGameStatusCallQuery = {
}

export interface IupdateGameStatusCallQuery {
}
type updateGameStatusCallResponse = '';

type updateGameStatusInnerResponse = updateGameStatusCallResponse|'' 

/**
 * 
 * @summary Update game status
 * @param {IupdateGameStatusCallQuery} [queryParams] qury parameters required for successfull call
 * @param {*} [options] Override http request option.
 * @throws {RequiredError}
 */
export type IupdateGameStatusCallResolver = LocalResolverType<IupdateGameStatusCallQuery, IGameResult, updateGameStatusInnerResponse>
const updateGameStatusCall = (
        queryParams?: IupdateGameStatusCallQuery,
        body?: IGameResult,
        options: Partial<RESTRequestType> = {}): RESTRequestType<updateGameStatusCallResponse> => {
    
    const localVarPath = getPath(`updateGameStatus`, `${globalPath}/game-status`, queryParams || {} , [], {  });

    const localVarRequestOptions = { method: 'put', ...options};

    const requestContentType = 'application/json'

    let innerResponse: updateGameStatusCallResponse|undefined 
    
    return {
        name: `updateGameStatus`,
        responseType: innerResponse,
        ...localVarRequestOptions,
        ...localVarPath,
        headers: {
            ...(localVarRequestOptions.headers || {}),
            ...(localVarPath.headers || {}),
        },
        data: body,
        requestContentType,
        security: ['bearerAuth',],
    };
}
const updateSessionCallQueryValidation = () => ({
})

const updateSessionCallQuery = {
}

export interface IupdateSessionCallQuery {
}
type updateSessionCallResponse = IUserSessionDB
    ;

type updateSessionInnerResponse = updateSessionCallResponse|'' 

/**
 * 
 * @summary Update user session
 * @param {IupdateSessionCallQuery} [queryParams] qury parameters required for successfull call
 * @param {*} [options] Override http request option.
 * @throws {RequiredError}
 */
export type IupdateSessionCallResolver = LocalResolverType<IupdateSessionCallQuery, IUserSession, updateSessionInnerResponse>
const updateSessionCall = (
        queryParams?: IupdateSessionCallQuery,
        body?: IUserSession,
        options: Partial<RESTRequestType> = {}): RESTRequestType<updateSessionCallResponse> => {
    
    const localVarPath = getPath(`updateSession`, `${globalPath}/session`, queryParams || {} , [], {  });

    const localVarRequestOptions = { method: 'put', ...options};

    const requestContentType = 'application/json'

    let innerResponse: updateSessionCallResponse|undefined 
    
    return {
        name: `updateSession`,
        responseType: innerResponse,
        ...localVarRequestOptions,
        ...localVarPath,
        headers: {
            ...(localVarRequestOptions.headers || {}),
            ...(localVarPath.headers || {}),
        },
        data: body,
        requestContentType,
        security: ['bearerAuth',],
    };
}
const registerUserCallQueryValidation = () => ({
})

const registerUserCallQuery = {
}

export interface IregisterUserCallQuery {
}
type registerUserCallResponse = IUserProfile
    ;

type registerUserInnerResponse = registerUserCallResponse|'' 

/**
 * 
 * @summary Register a new user
 * @param {IregisterUserCallQuery} [queryParams] qury parameters required for successfull call
 * @param {*} [options] Override http request option.
 * @throws {RequiredError}
 */
export type IregisterUserCallResolver = LocalResolverType<IregisterUserCallQuery, IUserRegister, registerUserInnerResponse>
const registerUserCall = (
        queryParams?: IregisterUserCallQuery,
        body?: IUserRegister,
        options: Partial<RESTRequestType> = {}): RESTRequestType<registerUserCallResponse> => {
    
    const localVarPath = getPath(`registerUser`, `${globalPath}/register`, queryParams || {} , [], {  });

    const localVarRequestOptions = { method: 'post', ...options};

    const requestContentType = 'application/json'

    let innerResponse: registerUserCallResponse|undefined 
    
    return {
        name: `registerUser`,
        responseType: innerResponse,
        ...localVarRequestOptions,
        ...localVarPath,
        headers: {
            ...(localVarRequestOptions.headers || {}),
            ...(localVarPath.headers || {}),
        },
        data: body,
        requestContentType,
        
    };
}
const loginUserCallQueryValidation = () => ({
})

const loginUserCallQuery = {
}

export interface IloginUserCallQuery {
}
type loginUserCallResponse = IUserProfile
    ;

type loginUserInnerResponse = loginUserCallResponse|'' 

/**
 * 
 * @summary Sign in a user
 * @param {IloginUserCallQuery} [queryParams] qury parameters required for successfull call
 * @param {*} [options] Override http request option.
 * @throws {RequiredError}
 */
export type IloginUserCallResolver = LocalResolverType<IloginUserCallQuery, IUserLogin, loginUserInnerResponse>
const loginUserCall = (
        queryParams?: IloginUserCallQuery,
        body?: IUserLogin,
        options: Partial<RESTRequestType> = {}): RESTRequestType<loginUserCallResponse> => {
    
    const localVarPath = getPath(`loginUser`, `${globalPath}/login`, queryParams || {} , [], {  });

    const localVarRequestOptions = { method: 'post', ...options};

    const requestContentType = 'application/json'

    let innerResponse: loginUserCallResponse|undefined 
    
    return {
        name: `loginUser`,
        responseType: innerResponse,
        ...localVarRequestOptions,
        ...localVarPath,
        headers: {
            ...(localVarRequestOptions.headers || {}),
            ...(localVarPath.headers || {}),
        },
        data: body,
        requestContentType,
        
    };
}
const logoutUserCallQueryValidation = () => ({
})

const logoutUserCallQuery = {
}

export interface IlogoutUserCallQuery {
}
type logoutUserCallResponse = '';

type logoutUserInnerResponse = logoutUserCallResponse|'' 

/**
 * 
 * @summary Sign out a user
 * @param {IlogoutUserCallQuery} [queryParams] qury parameters required for successfull call
 * @param {*} [options] Override http request option.
 * @throws {RequiredError}
 */
export type IlogoutUserCallResolver = LocalResolverType<IlogoutUserCallQuery, undefined, logoutUserInnerResponse>
const logoutUserCall = (
        queryParams?: IlogoutUserCallQuery,
        body?: undefined,
        options: Partial<RESTRequestType> = {}): RESTRequestType<logoutUserCallResponse> => {
    
    const localVarPath = getPath(`logoutUser`, `${globalPath}/logout`, queryParams || {} , [], {  });

    const localVarRequestOptions = { method: 'post', ...options};

    const requestContentType = undefined

    let innerResponse: logoutUserCallResponse|undefined 
    
    return {
        name: `logoutUser`,
        responseType: innerResponse,
        ...localVarRequestOptions,
        ...localVarPath,
        headers: {
            ...(localVarRequestOptions.headers || {}),
            ...(localVarPath.headers || {}),
        },
        data: body,
        requestContentType,
        security: ['bearerAuth',],
    };
}
const forgotPasswordCallQueryValidation = () => ({
})

const forgotPasswordCallQuery = {
}

export interface IforgotPasswordCallQuery {
}
type forgotPasswordCallResponse = '';

type forgotPasswordInnerResponse = forgotPasswordCallResponse|'' 

/**
 * 
 * @summary Request a password reset
 * @param {IforgotPasswordCallQuery} [queryParams] qury parameters required for successfull call
 * @param {*} [options] Override http request option.
 * @throws {RequiredError}
 */
export type IforgotPasswordCallResolver = LocalResolverType<IforgotPasswordCallQuery, IForgotPasswordEmail, forgotPasswordInnerResponse>
const forgotPasswordCall = (
        queryParams?: IforgotPasswordCallQuery,
        body?: IForgotPasswordEmail,
        options: Partial<RESTRequestType> = {}): RESTRequestType<forgotPasswordCallResponse> => {
    
    const localVarPath = getPath(`forgotPassword`, `${globalPath}/forgot-password`, queryParams || {} , [], {  });

    const localVarRequestOptions = { method: 'post', ...options};

    const requestContentType = 'application/json'

    let innerResponse: forgotPasswordCallResponse|undefined 
    
    return {
        name: `forgotPassword`,
        responseType: innerResponse,
        ...localVarRequestOptions,
        ...localVarPath,
        headers: {
            ...(localVarRequestOptions.headers || {}),
            ...(localVarPath.headers || {}),
        },
        data: body,
        requestContentType,
        
    };
}
const resetPasswordCallQueryValidation = () => ({
})

const resetPasswordCallQuery = {
}

export interface IresetPasswordCallQuery {
}
type resetPasswordCallResponse = IUserProfile
    ;

type resetPasswordInnerResponse = resetPasswordCallResponse|'' 

/**
 * 
 * @summary Set a new password after forgetting the old one
 * @param {IresetPasswordCallQuery} [queryParams] qury parameters required for successfull call
 * @param {*} [options] Override http request option.
 * @throws {RequiredError}
 */
export type IresetPasswordCallResolver = LocalResolverType<IresetPasswordCallQuery, ITokenPassword, resetPasswordInnerResponse>
const resetPasswordCall = (
        queryParams?: IresetPasswordCallQuery,
        body?: ITokenPassword,
        options: Partial<RESTRequestType> = {}): RESTRequestType<resetPasswordCallResponse> => {
    
    const localVarPath = getPath(`resetPassword`, `${globalPath}/reset-password`, queryParams || {} , [], {  });

    const localVarRequestOptions = { method: 'post', ...options};

    const requestContentType = 'application/json'

    let innerResponse: resetPasswordCallResponse|undefined 
    
    return {
        name: `resetPassword`,
        responseType: innerResponse,
        ...localVarRequestOptions,
        ...localVarPath,
        headers: {
            ...(localVarRequestOptions.headers || {}),
            ...(localVarPath.headers || {}),
        },
        data: body,
        requestContentType,
        
    };
}


export const restValidations = {
    any: (yup.mixed().nullable()),
    ForgotPasswordEmail: ForgotPasswordEmailValidation(),
    TokenPassword: TokenPasswordValidation(),
    UserRegister: UserRegisterValidation(),
    Grid: GridValidation(),
    Limits: LimitsValidation(),
    LevelGroup: LevelGroupValidation(),
    Level: LevelValidation(),
    UserLogin: UserLoginValidation(),
    LevelStats: LevelStatsValidation(),
    GameResult: GameResultValidation(),
    LevelProgress: LevelProgressValidation(),
    UserSession: UserSessionValidation(),
    UserSessionDB: UserSessionDBValidation(),
    LevelStatsDB: LevelStatsDBValidation(),
    UserProfile: UserProfileValidation(),
    TokenBody: TokenBodyValidation(),
    ProviderSetupBase: ProviderSetupBaseValidation(),
    getUserCallQuery: getUserCallQueryValidation(),
    deleteUserCallQuery: deleteUserCallQueryValidation(),
    updateGameStatusCallQuery: updateGameStatusCallQueryValidation(),
    updateSessionCallQuery: updateSessionCallQueryValidation(),
    registerUserCallQuery: registerUserCallQueryValidation(),
    loginUserCallQuery: loginUserCallQueryValidation(),
    logoutUserCallQuery: logoutUserCallQueryValidation(),
    forgotPasswordCallQuery: forgotPasswordCallQueryValidation(),
    resetPasswordCallQuery: resetPasswordCallQueryValidation(),
}
export const restOperations = {
    'getUser': getUserCall,
    'deleteUser': deleteUserCall,
    'updateGameStatus': updateGameStatusCall,
    'updateSession': updateSessionCall,
    'registerUser': registerUserCall,
    'loginUser': loginUserCall,
    'logoutUser': logoutUserCall,
    'forgotPassword': forgotPasswordCall,
    'resetPassword': resetPasswordCall,
};

export interface GlobalFormTypes { 
    ForgotPasswordEmailForm: IForgotPasswordEmail,

    TokenPasswordForm: ITokenPassword,

    UserRegisterForm: IUserRegister,

    GridForm: IGrid,

    LimitsForm: ILimits,

    LevelGroupForm: ILevelGroup,

    LevelForm: ILevel,

    UserLoginForm: IUserLogin,

    LevelStatsForm: ILevelStats,

    GameResultForm: IGameResult,

    LevelProgressForm: ILevelProgress,

    UserSessionForm: IUserSession,

    UserSessionDBForm: IUserSessionDB,

    LevelStatsDBForm: ILevelStatsDB,

    UserProfileForm: IUserProfile,

    TokenBodyForm: ITokenBody,

    ProviderSetupBaseForm: IProviderSetupBase,
   getUserCallQuery: IgetUserCallQuery,
   deleteUserCallQuery: IdeleteUserCallQuery,
   updateGameStatusCallQuery: IupdateGameStatusCallQuery,
   updateSessionCallQuery: IupdateSessionCallQuery,
   registerUserCallQuery: IregisterUserCallQuery,
   loginUserCallQuery: IloginUserCallQuery,
   logoutUserCallQuery: IlogoutUserCallQuery,
   forgotPasswordCallQuery: IforgotPasswordCallQuery,
   resetPasswordCallQuery: IresetPasswordCallQuery,
};

export interface GlobalFormValuesTypes { 
    ForgotPasswordEmailForm: Record<keyof IForgotPasswordEmail, GlobalLabelType<IForgotPasswordEmail>>,

    TokenPasswordForm: Record<keyof ITokenPassword, GlobalLabelType<ITokenPassword>>,

    UserRegisterForm: Record<keyof IUserRegister, GlobalLabelType<IUserRegister>>,

    GridForm: Record<keyof IGrid, GlobalLabelType<IGrid>>,

    LimitsForm: Record<keyof ILimits, GlobalLabelType<ILimits>>,

    LevelGroupForm: Record<keyof ILevelGroup, GlobalLabelType<ILevelGroup>>,

    LevelForm: Record<keyof ILevel, GlobalLabelType<ILevel>>,

    UserLoginForm: Record<keyof IUserLogin, GlobalLabelType<IUserLogin>>,

    LevelStatsForm: Record<keyof ILevelStats, GlobalLabelType<ILevelStats>>,

    GameResultForm: Record<keyof IGameResult, GlobalLabelType<IGameResult>>,

    LevelProgressForm: Record<keyof ILevelProgress, GlobalLabelType<ILevelProgress>>,

    UserSessionForm: Record<keyof IUserSession, GlobalLabelType<IUserSession>>,

    UserSessionDBForm: Record<keyof IUserSessionDB, GlobalLabelType<IUserSessionDB>>,

    LevelStatsDBForm: Record<keyof ILevelStatsDB, GlobalLabelType<ILevelStatsDB>>,

    UserProfileForm: Record<keyof IUserProfile, GlobalLabelType<IUserProfile>>,

    TokenBodyForm: Record<keyof ITokenBody, GlobalLabelType<ITokenBody>>,

    ProviderSetupBaseForm: Record<keyof IProviderSetupBase, GlobalLabelType<IProviderSetupBase>>,
   getUserCallQuery: Record<keyof IgetUserCallQuery, GlobalLabelType<IgetUserCallQuery>>,
   deleteUserCallQuery: Record<keyof IdeleteUserCallQuery, GlobalLabelType<IdeleteUserCallQuery>>,
   updateGameStatusCallQuery: Record<keyof IupdateGameStatusCallQuery, GlobalLabelType<IupdateGameStatusCallQuery>>,
   updateSessionCallQuery: Record<keyof IupdateSessionCallQuery, GlobalLabelType<IupdateSessionCallQuery>>,
   registerUserCallQuery: Record<keyof IregisterUserCallQuery, GlobalLabelType<IregisterUserCallQuery>>,
   loginUserCallQuery: Record<keyof IloginUserCallQuery, GlobalLabelType<IloginUserCallQuery>>,
   logoutUserCallQuery: Record<keyof IlogoutUserCallQuery, GlobalLabelType<IlogoutUserCallQuery>>,
   forgotPasswordCallQuery: Record<keyof IforgotPasswordCallQuery, GlobalLabelType<IforgotPasswordCallQuery>>,
   resetPasswordCallQuery: Record<keyof IresetPasswordCallQuery, GlobalLabelType<IresetPasswordCallQuery>>,
};
export const GlobalLabels = { 
    ForgotPasswordEmailForm: ForgotPasswordEmailForm(),
    TokenPasswordForm: TokenPasswordForm(),
    UserRegisterForm: UserRegisterForm(),
    GridForm: GridForm(),
    LimitsForm: LimitsForm(),
    LevelGroupForm: LevelGroupForm(),
    LevelForm: LevelForm(),
    UserLoginForm: UserLoginForm(),
    LevelStatsForm: LevelStatsForm(),
    GameResultForm: GameResultForm(),
    LevelProgressForm: LevelProgressForm(),
    UserSessionForm: UserSessionForm(),
    UserSessionDBForm: UserSessionDBForm(),
    LevelStatsDBForm: LevelStatsDBForm(),
    UserProfileForm: UserProfileForm(),
    TokenBodyForm: TokenBodyForm(),
    ProviderSetupBaseForm: ProviderSetupBaseForm(),
    getUserCallQuery,
    deleteUserCallQuery,
    updateGameStatusCallQuery,
    updateSessionCallQuery,
    registerUserCallQuery,
    loginUserCallQuery,
    logoutUserCallQuery,
    forgotPasswordCallQuery,
    resetPasswordCallQuery,
};

let _404 = async (props: any, body: any, context: any) => {
    context?.res?.status?.(404);
    return {
        message: "Not Found"
    } as any;
};

try {
    const _404Resolver = require('../resolvers/apiPaths/_404');
    if(_404Resolver) {
        _404 = _404Resolver.default || _404Resolver;
    }
} catch(e) {
    console.error('Mapping _404 failed with error', e);
};

let _401 = async (props: {message?: string}, body: Record<string, string>, context: any) => {
    context.setResponseStatus(403);
    return {
        message: props?.message || "Forbidden"
    };
};

try {
    const _401Resolver = require('../resolvers/apiPaths/_401');
    if(_401Resolver) {
        _401 = _401Resolver.default || _401Resolver;
    }
} catch(e) {
    console.log('Mapping _401 failed with error', e);
};

let _403 = async (props: {message?: string}, body: Record<string, string>, context: any) => {
    context.setResponseStatus(403);
    return {
        message: props?.message || "Forbidden"
    };
};

try {
    const _403Resolver = require('../resolvers/apiPaths/_403');
    if(_403Resolver) {
        _403 = _403Resolver.default || _403Resolver;
    }
} catch(e) {
    console.log('Mapping _403 failed with error', e);
};

let _500 = async (props: {message?: string}, body: Record<string, string>, context: any) => {
    context.setResponseStatus(500);
    return {
        message: props?.message || "Internal Server Error"
    };
};

try {
    const _500Resolver = require('../resolvers/apiPaths/_500');
    if(_500Resolver) {
        _500 = _500Resolver.default || _500Resolver;
    }
} catch(e) {
    console.log('Mapping _500 failed with error', e);
};


let pre_mapped_getUserReslover = _404 as IgetUserCallResolver;
try {
    const _pre_mapped_getUserReslover = require('../resolvers/apiPaths/getUser');
    if(_pre_mapped_getUserReslover) {
        pre_mapped_getUserReslover = _pre_mapped_getUserReslover?.default || _pre_mapped_getUserReslover;
    }
} catch(e) {
    console.error('Mapping at src/resolvers/apiPaths/getUser.ts not created');
}
let pre_mapped_deleteUserReslover = _404 as IdeleteUserCallResolver;
try {
    const _pre_mapped_deleteUserReslover = require('../resolvers/apiPaths/deleteUser');
    if(_pre_mapped_deleteUserReslover) {
        pre_mapped_deleteUserReslover = _pre_mapped_deleteUserReslover?.default || _pre_mapped_deleteUserReslover;
    }
} catch(e) {
    console.error('Mapping at src/resolvers/apiPaths/deleteUser.ts not created');
}
let pre_mapped_updateGameStatusReslover = _404 as IupdateGameStatusCallResolver;
try {
    const _pre_mapped_updateGameStatusReslover = require('../resolvers/apiPaths/updateGameStatus');
    if(_pre_mapped_updateGameStatusReslover) {
        pre_mapped_updateGameStatusReslover = _pre_mapped_updateGameStatusReslover?.default || _pre_mapped_updateGameStatusReslover;
    }
} catch(e) {
    console.error('Mapping at src/resolvers/apiPaths/updateGameStatus.ts not created');
}
let pre_mapped_updateSessionReslover = _404 as IupdateSessionCallResolver;
try {
    const _pre_mapped_updateSessionReslover = require('../resolvers/apiPaths/updateSession');
    if(_pre_mapped_updateSessionReslover) {
        pre_mapped_updateSessionReslover = _pre_mapped_updateSessionReslover?.default || _pre_mapped_updateSessionReslover;
    }
} catch(e) {
    console.error('Mapping at src/resolvers/apiPaths/updateSession.ts not created');
}
let pre_mapped_registerUserReslover = _404 as IregisterUserCallResolver;
try {
    const _pre_mapped_registerUserReslover = require('../resolvers/apiPaths/registerUser');
    if(_pre_mapped_registerUserReslover) {
        pre_mapped_registerUserReslover = _pre_mapped_registerUserReslover?.default || _pre_mapped_registerUserReslover;
    }
} catch(e) {
    console.error('Mapping at src/resolvers/apiPaths/registerUser.ts not created');
}
let pre_mapped_loginUserReslover = _404 as IloginUserCallResolver;
try {
    const _pre_mapped_loginUserReslover = require('../resolvers/apiPaths/loginUser');
    if(_pre_mapped_loginUserReslover) {
        pre_mapped_loginUserReslover = _pre_mapped_loginUserReslover?.default || _pre_mapped_loginUserReslover;
    }
} catch(e) {
    console.error('Mapping at src/resolvers/apiPaths/loginUser.ts not created');
}
let pre_mapped_logoutUserReslover = _404 as IlogoutUserCallResolver;
try {
    const _pre_mapped_logoutUserReslover = require('../resolvers/apiPaths/logoutUser');
    if(_pre_mapped_logoutUserReslover) {
        pre_mapped_logoutUserReslover = _pre_mapped_logoutUserReslover?.default || _pre_mapped_logoutUserReslover;
    }
} catch(e) {
    console.error('Mapping at src/resolvers/apiPaths/logoutUser.ts not created');
}
let pre_mapped_forgotPasswordReslover = _404 as IforgotPasswordCallResolver;
try {
    const _pre_mapped_forgotPasswordReslover = require('../resolvers/apiPaths/forgotPassword');
    if(_pre_mapped_forgotPasswordReslover) {
        pre_mapped_forgotPasswordReslover = _pre_mapped_forgotPasswordReslover?.default || _pre_mapped_forgotPasswordReslover;
    }
} catch(e) {
    console.error('Mapping at src/resolvers/apiPaths/forgotPassword.ts not created');
}
let pre_mapped_resetPasswordReslover = _404 as IresetPasswordCallResolver;
try {
    const _pre_mapped_resetPasswordReslover = require('../resolvers/apiPaths/resetPassword');
    if(_pre_mapped_resetPasswordReslover) {
        pre_mapped_resetPasswordReslover = _pre_mapped_resetPasswordReslover?.default || _pre_mapped_resetPasswordReslover;
    }
} catch(e) {
    console.error('Mapping at src/resolvers/apiPaths/resetPassword.ts not created');
}

export const apiResolvers = {
    _404: _404,
    _401: _401,
    _403: _403,
    _500: _500,
    'getUser': pre_mapped_getUserReslover,
    'deleteUser': pre_mapped_deleteUserReslover,
    'updateGameStatus': pre_mapped_updateGameStatusReslover,
    'updateSession': pre_mapped_updateSessionReslover,
    'registerUser': pre_mapped_registerUserReslover,
    'loginUser': pre_mapped_loginUserReslover,
    'logoutUser': pre_mapped_logoutUserReslover,
    'forgotPassword': pre_mapped_forgotPasswordReslover,
    'resetPassword': pre_mapped_resetPasswordReslover,
} as const;

export type APIResolversType = typeof apiResolvers


export const generatedRoutes: ExpressRouteType[] = [
  {
    path: "/user",
    method: "get",
    resolver: pre_mapped_getUserReslover,
    security: ['bearerAuth',],
  },
  {
    path: "/user",
    method: "delete",
    resolver: pre_mapped_deleteUserReslover,
    security: ['bearerAuth',],
  },
  {
    path: "/game-status",
    method: "put",
    resolver: pre_mapped_updateGameStatusReslover,
    security: ['bearerAuth',],
  },
  {
    path: "/session",
    method: "put",
    resolver: pre_mapped_updateSessionReslover,
    security: ['bearerAuth',],
  },
  {
    path: "/register",
    method: "post",
    resolver: pre_mapped_registerUserReslover,
    
  },
  {
    path: "/login",
    method: "post",
    resolver: pre_mapped_loginUserReslover,
    
  },
  {
    path: "/logout",
    method: "post",
    resolver: pre_mapped_logoutUserReslover,
    security: ['bearerAuth',],
  },
  {
    path: "/forgot-password",
    method: "post",
    resolver: pre_mapped_forgotPasswordReslover,
    
  },
  {
    path: "/reset-password",
    method: "post",
    resolver: pre_mapped_resetPasswordReslover,
    
  },
    {
        path: "*" as `/${string}`,
        method: "get",
        resolver: _404
    },
    {
        path: "*" as `/${string}`,
        method: "post",
        resolver: _404
    },
    {
        path: "*" as `/${string}`,
        method: "put",
        resolver: _404
    },
    {
        path: "*" as `/${string}`,
        method: "delete",
        resolver: _404
    }
];