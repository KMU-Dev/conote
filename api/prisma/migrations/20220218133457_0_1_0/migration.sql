-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'UNVERIFIED', 'BANNED');

-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('Google');

-- CreateEnum
CREATE TYPE "VodcfsSessionStatus" AS ENUM ('CREATING', 'AUTHENTICATED', 'ERROR');

-- CreateEnum
CREATE TYPE "VodcfsSessionErrorReason" AS ENUM ('INVALID_CAPTCHA', 'INVALID_ACCOUNT', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "VideoUploadService" AS ENUM ('VODCFS');

-- CreateEnum
CREATE TYPE "VodcfsVideoResolution" AS ENUM ('SD', 'HD', 'FHD', 'SRC');

-- CreateEnum
CREATE TYPE "VodcfsVideoStatus" AS ENUM ('CONVERTING', 'CONVERTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "studentId" TEXT NOT NULL,
    "picture" TEXT,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuth" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" "OAuthProvider" NOT NULL,
    "sub" TEXT NOT NULL,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VodcfsSession" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "phpsessid" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT E'zh-tw',
    "loginToken" TEXT NOT NULL,
    "timezone" INTEGER,
    "noteFontSize" INTEGER,
    "noteExpand" INTEGER,
    "captcha" TEXT,
    "captchaAnswer" TEXT,
    "errorReason" "VodcfsSessionErrorReason",
    "status" "VodcfsSessionStatus" NOT NULL DEFAULT E'CREATING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VodcfsSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT,
    "duration" TEXT,
    "uploadService" "VideoUploadService" NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VodcfsVideo" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT,
    "size" INTEGER NOT NULL,
    "streamingId" TEXT,
    "resolutions" "VodcfsVideoResolution"[],
    "status" "VodcfsVideoStatus" NOT NULL DEFAULT E'CONVERTING',
    "videoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VodcfsVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoIndex" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "videoId" INTEGER,
    "vodcfsId" INTEGER,

    CONSTRAINT "VideoIndex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "VodcfsVideo_videoId_key" ON "VodcfsVideo"("videoId");

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VodcfsSession" ADD CONSTRAINT "VodcfsSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VodcfsVideo" ADD CONSTRAINT "VodcfsVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoIndex" ADD CONSTRAINT "VideoIndex_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoIndex" ADD CONSTRAINT "VideoIndex_vodcfsId_fkey" FOREIGN KEY ("vodcfsId") REFERENCES "VodcfsVideo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
