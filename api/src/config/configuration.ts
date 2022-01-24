import * as yaml from 'js-yaml';
import * as glob from 'glob';
import { resolve } from 'app-root-path';
import { readFileSync } from 'fs';
import { join } from 'path';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { InvalidConfigError } from './config.error';
import { AppConfig } from './schema';

const defaultConfig = join(__dirname, 'default.yaml');

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
