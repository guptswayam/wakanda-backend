import { ArgumentMetadata, BadRequestException, HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any, any> {
  async transform(value:any, metaData: ArgumentMetadata) {
    if(!value)
      throw new BadRequestException("Empty Body!")

    const {metatype} = metaData

    if(!metatype || !this.toValidate(metatype))
      return value;
    
    const object = plainToClass(metatype, value)

    const errors = await validate(object)

    console.log(errors)
    if(errors.length > 0)
      throw new HttpException({message: "Invalid Body!", errors: this.buildError(errors)}, 401)

    return value
    
  }

  private buildError(errors: ValidationError[]) {
    return errors.map(el => {
      return {[el.property]: Object.values(el.constraints)}
    })
  }


  private toValidate(metatype): boolean {
    const types = [String, Number, Boolean, Array, Object];
    return !types.find(type => type === metatype)
  }

}