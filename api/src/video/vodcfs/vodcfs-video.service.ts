import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VodcfsVideoResolution } from '@prisma/client';
import { load } from 'cheerio';
import FormData from 'form-data';
import { FileUpload } from 'graphql-upload';
import { PrismaService } from '../../prisma/prisma.service';
import { VodcfsUploadVideoResponse } from './type';
import { VodcfsSessionService } from './vodcfs-session.service';

@Injectable()
export class VodcfsVideoService {
    private readonly axios: HttpService['axiosRef'];
    private readonly folderId: string;

    constructor(
        readonly httpService: HttpService,
        readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private readonly vodcfsSessionService: VodcfsSessionService,
    ) {
        this.axios = httpService.axiosRef;
        this.folderId = configService.get('video.vodcfs.folderId');
    }

    async uploadVideo(videoId: number, title: string, file: Promise<FileUpload>, sessionId: string) {
        const session = await this.vodcfsSessionService.findSessionById(sessionId);
        const cookie = this.vodcfsSessionService.buildCookieFrom(session);

        const uploadUrl = await this.getUploadUrl(cookie);
        const { createReadStream } = await file;

        const formData = new FormData();
        formData.append('chapterID', '0');
        formData.append('files[]', createReadStream(), { filename: `${title}.ecm` });

        const response = await this.axios.post(uploadUrl, formData, {
            headers: { ...formData.getHeaders(), ...{ cookie } },
            maxBodyLength: 2000000000,
        });
        const uploadedFile = (response.data as VodcfsUploadVideoResponse).files[0];
        const vodcfsVideoId = +uploadedFile.url.split('/')[2];

        const videoInfo = await this.parseVideoInfo(vodcfsVideoId, cookie);

        const vodcfsVideo = await this.prisma.vodcfsVideo.create({
            data: {
                id: vodcfsVideoId,
                title,
                size: uploadedFile.size,
                video: { connect: { id: videoId } },
                ...videoInfo,
            },
        });
        return vodcfsVideo;
    }

    async findVodcfsVideoByVideo(videoId: number) {
        return await this.prisma.vodcfsVideo.findFirst({
            where: { videoId },
        });
    }

    private async getUploadUrl(cookie: string) {
        const url = `http://vodcfs.kmu.edu.tw/km/${this.folderId}`;
        const response = await this.axios.get(url, { headers: { cookie } });

        const $ = load(response.data);
        const script = $('script:last-of-type').html();

        const uploaderFunc = script.split('\n')[2];
        const json = uploaderFunc.slice(26, uploaderFunc.lastIndexOf('}'));
        const data = JSON.parse(json);
        return `http://vodcfs.kmu.edu.tw${data.ecm.url}`;
    }

    private async parseVideoInfo(id: number, cookie: string) {
        const url = `http://vodcfs.kmu.edu.tw/media/${id}`;
        const response = await this.axios.get(url, { headers: { cookie } });
        const $ = load(response.data);

        // parse duration
        const fsHint = $('#titlePanel > .fs-hint').text();
        const splitDuration = fsHint.split(',')[0].split(':');
        const hour = splitDuration.length > 2 ? +splitDuration[0] : 0;
        const minute = +splitDuration[splitDuration.length - 2];
        const second = +splitDuration[splitDuration.length - 1];
        const duration = hour === 0 ? `PT${minute}M${second}S` : `PT${hour}H${minute}M${second}S`;

        // parse streaming id
        const videoSrc = $('video').attr('src');
        const streamingId = videoSrc && videoSrc.split('/')[6];

        // parse resolutions
        const resolutions = $('.cog-resolution option')
            .map(function () {
                return $(this).text();
            })
            .toArray()
            .map((resolution) => this.convertResolution(resolution));

        return { duration, streamingId, resolutions };
    }

    private convertResolution(resolution: string): VodcfsVideoResolution {
        switch (resolution) {
            case '720 x 404':
                return VodcfsVideoResolution.SD;
            case '720 x 448':
                return VodcfsVideoResolution.SD;
            case '720 x 540':
                return VodcfsVideoResolution.SD;
            case '1024 x 768':
                return VodcfsVideoResolution.SRC;
            case '1280 x 720':
                return VodcfsVideoResolution.HD;
            case '1208 x 800':
                return VodcfsVideoResolution.HD;
            case '1920 x 1080':
                return VodcfsVideoResolution.FHD;
            default:
                return VodcfsVideoResolution.SD;
        }
    }

    private getPageHeaders(cookie?: string) {
        const headers: Record<string, string> = {
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-TW,zh;q=0.9',
            Connection: 'keep-alive',
            DNT: '1',
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36',
        };
        if (cookie) headers.Cookie = cookie;
        return headers;
    }
}
