import {Inject, OnInit, Service} from '@tsed/common';
import {MongooseModel, Ref} from '@tsed/mongoose';
import {$log} from 'ts-log-debug';
import {ApplicationState} from '../../model/ApplicationState';
import {Scale} from '../../model/Scale';
import {ScaleService} from './ScaleService';


@Service()
export class ApplicationStateService implements OnInit {

  constructor(@Inject(ApplicationState) private stateModel: MongooseModel<ApplicationState>,
              @Inject(ScaleService) private scaleService: ScaleService) {
  }

  $onInit() {
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

  async getState(): Promise<ApplicationState> {
    const states = await this.stateModel.find().exec();
    return states[0];
  }

  async saveState(applicationState: ApplicationState): Promise<ApplicationState> {
    const model = new this.stateModel(applicationState);
    await model.update(applicationState, {upsert: true});
    return model;
  }

  async getSelectedScale(): Promise<Scale> {
    const applicationState = await this.getState();
    console.log(applicationState.selectedScale);
    return await this.scaleService.findById(applicationState.selectedScale.toString());
  }

  async setSelectedScale(scaleId: string): Promise<Scale> {
    const applicationState = await this.getState();
    applicationState.selectedScale = scaleId;
    await this.saveState(applicationState);
    return await this.scaleService.findById(applicationState.selectedScale.toString());
  }

}
