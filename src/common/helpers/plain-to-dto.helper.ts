import { plainToClass } from 'class-transformer';
import { ObjectModel, lean } from './lean.helper';

export function plainToDto<T extends ObjectModel, K = any>(
  classe: any,
  object: any,
): K {
  const isArray = Array.isArray(object);
  const objectsArray = Array.isArray(object) ? object : [object];
  const objects: any[] = objectsArray.map((object: T) => {
    if (!object) {
      return;
    }
    return plainToClass(classe, lean(object), {
      excludeExtraneousValues: true,
    });
  });
  return isArray ? objects : objects[0];
}
