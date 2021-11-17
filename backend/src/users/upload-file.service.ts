import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class S3Service {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async upload(
    file: any,
    key: string,
    bucket: string = process.env.MINIO_BUCKET,
  ) {
    fs.readFile(file, async (err, data) => {
      if (err) {
        return;
      } else {
        const s3Params = {
          Bucket: bucket,
          Key: key,
          Body: data,
        };

        return await this.s3.upload(s3Params, function (s3Err, data) {
          if (s3Err) {
            console.log('uploadFile err', s3Err);
            throw s3Err;
          }
          console.log(`File uploaded successfully at ${data.Location}`);
        });
      }
    });
  }

  async getListBucket() {
    return await (
      await this.s3.listBuckets().promise()
    ).Buckets;
  }
}
