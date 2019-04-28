import 'reflect-metadata';
import { Inject } from '@nestjs/common';
import { getQueueToken } from './bull.utils';

export const PROCESS_QUEUE_HANDLER_METADATA = '__processQueueHandler__';

export function InjectQueue(name?: string): ParameterDecorator {
  return Inject(getQueueToken(name));
}

export const ProcessQueue = <T = string>(metadata?: T): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(PROCESS_QUEUE_HANDLER_METADATA, metadata, descriptor.value);
    return descriptor;
  };
};