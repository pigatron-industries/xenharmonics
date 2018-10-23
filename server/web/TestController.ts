import {
  Controller, Get, Post, Authenticated, Delete, BodyParams, Required, PathParams, QueryParams
} from '@tsed/common';
import {$log} from 'ts-log-debug';

// import {IUser} from '../entity/IUser';
// import UserService from "../service/UserService";


@Controller('/test')
export class TestController {

  constructor() {
  }

  @Get('')
  public test(): any {
    $log.info('test controller called');
    return {'test': 'API works'};
  }


}
