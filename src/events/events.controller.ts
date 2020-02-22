import { Controller, Post, Body, Response, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(
    @Body() dto: CreateEventDto,
    @Response() res,
  ) {
    await this.eventsService.createEvent(dto)
    return res.status(HttpStatus.NO_CONTENT).send()
  }
}