import { OUTPUTSHOT_PLACEHOLDER_SUN_SVG as OUTPUTSHOT_PLACEHOLDER } from '../components/helpers/OutputshotPlaceholder';

export const NULL_TELL: TellModel = {
  ulid: '',
  username: '',
  title: '',
  description: '',
  source: '',
  creationDate: '',
  lastPublicationDate: '',
  outputshotUrl: '',
  outputshotData: '',
  kernelAvailable: false,
}

export type TellModel = {
  ulid: string;
  username: string;
  title: string;
  description: string;
  source: string;
  creationDate: string;
  lastPublicationDate?: string;
  outputshotUrl: string;
  outputshotData: string;
  kernelAvailable: boolean;
}

export class ATell implements TellModel {
  ulid: string;
  username: string;
  title: string;
  description: string;
  source: string;
  creationDate: string;
  lastPublicationDate?: string;
  outputshotUrl: string;
  outputshotData: string;
  kernelAvailable: boolean;
  constructor(tell: any, kernelAvailable = false) {
    this.ulid = tell.ulid_s;
    this.username = tell.username_s;
    this.title = tell.title_t;
    this.description = tell.description_t;
    this.source = tell.source_t;
    this.creationDate = tell.creation_ts_dt;
    this.lastPublicationDate = tell.last_publish_ts_dt;
    this.outputshotUrl = tell.outputshot_url_s || '';
    this.outputshotData = OUTPUTSHOT_PLACEHOLDER;
    this.kernelAvailable = kernelAvailable;
  }
}
