import {Inject, OnInit, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {ApplicationState} from '../model/ApplicationState';
import {$log} from 'ts-log-debug';


@Service()
export class ApplicationStateService implements OnInit {

  constructor(@Inject(ApplicationState) private stateModel: MongooseModel<ApplicationState>) {
  }

  $onInit(): Promise<any> | void {
    this.createState();
  }

  async createState() {
    const states = await this.stateModel.find().exec();
    if (states.length === 0) {
      $log.info('Creating initial application state');
      const stateModel = new this.stateModel(new ApplicationState());
      return await stateModel.save();
    } else {
      return states[0];
    }
  }

}
