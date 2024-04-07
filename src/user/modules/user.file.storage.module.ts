import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const suffix: string = uuidv4()
          const ext = file.originalname.split('.').pop()
          const filename = `${file.originalname}-${suffix}${ext}`
          cb(null, filename)
        },
      }),
    }),
  ],
})
export class FileStorageModule {}
