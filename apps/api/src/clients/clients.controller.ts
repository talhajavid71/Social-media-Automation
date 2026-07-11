import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';import { ClientDto } from './client.dto';import { ClientsService } from './clients.service';
type R={user:{id:string}};
@UseGuards(JwtAuthGuard) @Controller('clients') export class ClientsController{
 constructor(private s:ClientsService){}
 @Get() list(@Req()r:R){return this.s.list(r.user.id)} @Get('stats') stats(@Req()r:R){return this.s.stats(r.user.id)}
 @Get(':id') one(@Req()r:R,@Param('id')id:string){return this.s.one(r.user.id,id)}
 @Post() create(@Req()r:R,@Body()d:ClientDto){return this.s.create(r.user.id,d)}
 @Patch(':id') update(@Req()r:R,@Param('id')id:string,@Body()d:ClientDto){return this.s.update(r.user.id,id,d)}
 @Post(':id/archive') archive(@Req()r:R,@Param('id')id:string){return this.s.archive(r.user.id,id)}
}
