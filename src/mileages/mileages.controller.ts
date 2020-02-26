import { Controller, Post, Get, Body, Response, HttpStatus, Param, HttpException } from '@nestjs/common';
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
    // TODO: Use decorator to separate authentication
    await this.mileagesService.grantPoint(userId, dto);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get(':userId')
  async get(
    @Param('userId') userId,
    @Response() res,
  ) {
    // TODO: return 401 when authentication is added
    const mileages = await this.mileagesService.getMileages(userId);
    if (!mileages) {
      throw new HttpException('Not found a user', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(mileages);
  }
}