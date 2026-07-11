import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientDto } from './client.dto';
@Injectable() export class ClientsService {
 constructor(private db:PrismaService){}
 list(ownerId:string){return this.db.client.findMany({where:{ownerId},orderBy:{createdAt:'desc'}})}
 create(ownerId:string,d:ClientDto){return this.db.client.create({data:{...d,ownerId}})}
 async one(ownerId:string,id:string){const c=await this.db.client.findFirst({where:{id,ownerId}});if(!c)throw new NotFoundException('Client not found.');return c}
 async update(ownerId:string,id:string,d:ClientDto){await this.one(ownerId,id);return this.db.client.update({where:{id},data:d})}
 async archive(ownerId:string,id:string){await this.one(ownerId,id);return this.db.client.update({where:{id},data:{status:'ARCHIVED'}})}
 async stats(ownerId:string){return {clients:await this.db.client.count({where:{ownerId,status:'ACTIVE'}}),pendingPosts:0,scheduledToday:0,publishedToday:0,failed:0}}
}
