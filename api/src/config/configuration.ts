import { resolve } from 'app-root-path';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { readFileSync } from 'fs';
import * as glob from 'glob';
import * as yaml from 'js-yaml';
import { InvalidConfigError } from './config.error';
import { AppConfig } from './schema';

const defaultConfig = resolve('config/default.yaml');

export default () => {
    const filenames = glob.sync('config/*.yaml');

    const configs: unknown[] = [];

    // load default config
    configs.push(yaml.load(readFileSync(defaultConfig, 'utf-8')));

    for (const filename of filenames) {
        const filepath = resolve(filename);
        configs.push(yaml.load(readFileSync(filepath, 'utf-8')));
    }

    const config = Object.assign({}, ...configs);

    // validate config
    const validatedConfig = plainToClass(AppConfig, config);
    const errors = validateSync(validatedConfig);
    if (errors.length > 0) throw new InvalidConfigError(errors);

    return validatedConfig;
};
