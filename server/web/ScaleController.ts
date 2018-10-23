import {
  Controller, Get, Post, Authenticated, Delete, BodyParams, Required, PathParams, QueryParams
} from '@tsed/common';
import {$log} from 'ts-log-debug';

// import {IUser} from '../entity/IUser';
// import UserService from "../service/UserService";


@Controller('/scale')
export class ScaleController {

  constructor() {
  }

  @Get('')
  public getAll(): any {
    return {'test': 'API works'};
  }

}
