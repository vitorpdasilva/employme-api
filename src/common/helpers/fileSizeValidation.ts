import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneKb = 1000
    const twoMb = 2000000
    const minFileSize = oneKb
    const maxFileSize = twoMb
    if (value.size < minFileSize || value.size > maxFileSize) {
      throw new Error(
        `File size must be between ${minFileSize} and ${maxFileSize} bytes`,
      )
    }
  }
}
