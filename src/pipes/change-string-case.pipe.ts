import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import * as changeCase from 'change-case'

@Injectable()
export class ChangeStringCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // value.name = changeCase.capitalCase(value.name)
    return value
  }
}
