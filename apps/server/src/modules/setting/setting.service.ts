import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Setting } from './setting.entity';
import { SettingUpdateDto } from './setting.dto';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingReposity: Repository<Setting>,
  ) {}

  /**
   * @description 获取设置
   */
  async findOne(): Promise<Setting> {
    const res = await this.settingReposity.find();
    const data = res[0];

    if (!data) {
      return {} as Setting;
    }

    return data;
  }

  /**
   * @description 更新配置
   * @param {SettingUpdateDto} setting
   */
  async update(setting: SettingUpdateDto): Promise<Setting> {
    const res = await this.settingReposity.find();
    const existSetting = res[0];

    const newSetting = existSetting
      ? await this.settingReposity.merge(existSetting, setting)
      : this.settingReposity.create(setting);
    return this.settingReposity.save(newSetting);
  }
}
