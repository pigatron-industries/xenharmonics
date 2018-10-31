import {OnInit, Service} from '@tsed/common';
import {getInputOutputService} from '../../io/InputOutputServiceFactory';
import {InputOutputServiceInterface} from '../../io/InputOutputServiceInterface';


@Service()
export class InputOutputService implements OnInit {

  private io: InputOutputServiceInterface;

  async $onInit() {
    this.io = await getInputOutputService();
    this.io.setup();
    return this.io;
  }

}
