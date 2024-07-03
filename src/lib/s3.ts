import {
  PutObjectCommand,
  DeleteObjectCommand,
  type S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const putObjectCommand = async (
  client: S3Client,
  Bucket: string,
  Key: string,
  Body: string | Buffer,
) => {
  const command = new PutObjectCommand({
    Bucket,
    Key,
    Body,
  })

  return await client.send(command)
}

export const deleteObjectCommand = async (
  client: S3Client,
  Bucket: string,
  Key: string,
) => {
  const command = new DeleteObjectCommand({
    Bucket,
    Key,
  })

  return await client.send(command)
}

export const createPresignedUrl = (
  client: S3Client,
  Bucket: string,
  Key: string,
  expiresIn: number,
) => {
  const command = new GetObjectCommand({ Bucket, Key })

  return getSignedUrl(client, command, { expiresIn })
}
