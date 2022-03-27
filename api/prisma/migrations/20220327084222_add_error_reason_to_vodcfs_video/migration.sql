-- CreateEnum
CREATE TYPE "VodcfsVideoErrorReason" AS ENUM ('MALFORMED_EVERCAM');

-- AlterEnum
ALTER TYPE "VodcfsVideoStatus" ADD VALUE 'ERROR';

-- AlterTable
ALTER TABLE "VodcfsVideo" ADD COLUMN     "errorReason" "VodcfsVideoErrorReason";
