export interface InitialVerifyFormValuesType {
  address: string;
  message: string;
  signature: string;
}

export enum InitialVerifyFormValuesEnum {
  address = 'address',
  message = 'message',
  signature = 'signature'
}

export enum SignedMessageStatusesEnum {
  pending = 'pending',
  failed = 'failed',
  signed = 'signed',
  cancelled = 'cancelled'
}
