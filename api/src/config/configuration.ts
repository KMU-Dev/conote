import { resolve } from 'app-root-path';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { readFileSync } from 'fs';
import * as glob from 'glob';
import * as yaml from 'js-yaml';
import merge from 'lodash/merge';
import { InvalidConfigError } from './config.error';
import { AppConfig } from './schema/app.schema';

const defaultConfigPath = resolve('config/default.yaml');

export default () => {
    const filenames = glob.sync('config/*.yaml');

    const configs: unknown[] = [];

    // load default config
    const defaultConfig = yaml.load(readFileSync(defaultConfigPath, 'utf-8'));

    for (const filename of filenames) {
        const filepath = resolve(filename);
        configs.push(yaml.load(readFileSync(filepath, 'utf-8')));
    }

    const config = merge(defaultConfig, ...configs);

    // validate config
    const validatedConfig = plainToInstance(AppConfig, config);
    const errors = validateSync(validatedConfig);
    if (errors.length > 0) throw new InvalidConfigError(errors);

    return validatedConfig;
};
