/**
 * @description 数据表验证器
 * 要使class-validator的验证信息生效，必须进行这一步
 * @example https://www.dazhuanlan.com/2020/03/01/5e5ae16dcba90/?__cf_chl_jschl_tk__=313f46942c61d640d60ced99b9f32c52c8c0aa22-1615278671-0-Ab7lTVCV8iU4ZyRBscmpPxDeLzzgpVcU2C94Ms5cQeiiOsju0opSZh0-nXWHzkbthXVHURJpwkZGrSgbDH-WFrK9oLn8znPALvvi3ckCeo8k1Gdc6eS3ESh2OwZOK-6n9l5-rDNiaDpHUYuK4Ch0OLplYOBezEfvPppnmoKmVJBSNGT1TicdNKg_PF_d4rR3xccFMcPyFXx9iQ_cy-BRzYwEO0U_TjiKP4mhqhu6hBQs2nCD25nhdyPCq98ueNgM7SuoXnckZtvqC6TxBCGz1tVYf6iMm8iRh6VfIg5BmJtKFD_RfYhDQJh__zxjVUqlTY_wYcmUoK7ldl2zB52JRwXlsOfr2D0fcmgrRXTG0-38
 * @author 潜
 */

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // entity定义的验证信息合并返回
      const errorMessage = errors
        .map(error => {
          return Object.values(error.constraints)
            .map(v => `${v}!`)
            .join(' && ');
        })
        .join('; ');
      throw new BadRequestException(errorMessage);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
