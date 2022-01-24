import { SetMetadata } from '@nestjs/common';

export const Domain = (domain: string) => SetMetadata('domain', domain);
