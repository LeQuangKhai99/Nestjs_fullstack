// s3-manager.service.ts
import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class S3ManagerService {
  constructor(
    @InjectAwsService(S3) private readonly s3: S3,
  ) {
  }

  public async listBucketContents(bucket: string) {
    console.log(bucket);
    
    const response = await this.s3.listObjectsV2({ Bucket: bucket }).promise();
    return response.Contents.map(c => c.Key);
  }

  public async uploadFile(imageBuffer: Buffer, fileName: string) {
    const s3 = new S3();
    return await s3.upload({
      Bucket: 'demo-bucket',
      Body: imageBuffer,
      Key: fileName
    }).promise();
  }

  public async upload(
    file: any,
    key: string,
    bucket: string = process.env.MINIO_BUCKET,
  ) {
    
    fs.readFile('a.txt', async (err, data) => {
      console.log(err);
      
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

  public async deleteFile(key: string) {
    const s3 = new S3();
    return await s3.deleteObject({
      Bucket: 'demo-bucket',
      Key: key
    }).promise();
  }
}