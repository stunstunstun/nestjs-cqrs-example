import { Controller, Post, Get, Body, Response, HttpStatus, Param } from '@nestjs/common';
import { MileagesService } from './mileages.service';
import { GrantPointDto } from './dto/grant-point.dto';

@Controller('mileages')
export class MileagesController {
  constructor(private readonly mileagesService: MileagesService) {}

  @Post(':userId')
  async create(
    @Param('userId') userId,
    @Body() dto: GrantPointDto,
    @Response() res,
  ) {
    return res.status(HttpStatus.OK).json(
      await this.mileagesService.grantPoint(userId, dto)
    );
  }

  @Get(':userId')
  async get(
    @Param('userId') userId,
    @Response() res,
  ) {
    return res.status(HttpStatus.OK).json(
      await this.mileagesService.getMileages(userId)
    );
  }
}