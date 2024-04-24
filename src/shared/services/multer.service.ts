import { S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  private s3Config: S3Client
  constructor(
    private configService: ConfigService,
  ) {
    this.s3Config = new S3Client({
      endpoint:  this.configService.getOrThrow('BUCKET_ENDPOINT'),
      region:  this.configService.getOrThrow('BUCKET_REGION'),
      credentials: {
        accessKeyId:  this.configService.getOrThrow('BUCKET_KEY_ID'),
        secretAccessKey:  this.configService.getOrThrow('BUCKET_SECRET_KEY'),
      },
    })
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multerS3({
        s3: this.s3Config,
        bucket: this.configService.getOrThrow('BUCKET_NAME'),
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
          const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4()
          const extension = path.parse(file.originalname).ext
          cb(null, `${fileName}${extension}`)
        },
      })
    };
  }
}