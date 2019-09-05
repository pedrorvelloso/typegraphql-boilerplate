import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import fs from 'fs';
import { Service } from 'typedi';

export interface EnvConfig {
  [key: string]: any;
}

type EnvGet = 'NODE_ENV' | 'PORT' | 'DB_HOST' | 'DB_PORT' | 'DB_USERNAME' | 'DB_PASSWORD' | 'DB_DATABASE';

@Service()
class EnvService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const config = dotenv.parse(fs.readFileSync(`.env`));
    this.envConfig = this.validateInput(config);
  }

  get(key: EnvGet): any {
    return this.envConfig[key];
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),
      DB_HOST: Joi.string().default('localhost'),
      DB_PORT: Joi.number().default(5432),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_DATABASE: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

export default EnvService;
