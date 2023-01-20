import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entity/client.entity';
import { OrderStateEnum } from 'src/enum/orderState.enum';
import { Plant } from 'src/plant/entity/plant.entity';
import { PlantService } from 'src/plant/plant.service';
import { Repository } from 'typeorm';
import { addOrderDto } from './Dto/addOrder.dto';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  plantService :PlantService;
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
  ) {}

  async getOrderByClient(user :Client): Promise<Order[]> {
    return await this.OrderRepository.find({
      where:{ client:user},
      relations: {
        plant: true,
        client: true,
      },
    });
  }

  async getOrders(): Promise<Order[]> {
    return await this.OrderRepository.find({
      relations: {
        plant: true,
        client: true,
      },
    });
  }
  // it's not working
  async getOrderBySeller(user :Client): Promise<Order[]> {
    console.log(user);
   const plants = await this.plantService.getAllPlantsbySeller(user);
   console.log(plants);
     return await this.OrderRepository.find({
      where:{ plant :plants},
      relations: {
        plant: true,
        client: true,
      },
    });
  }
  async addOrder(Order: addOrderDto): Promise<Order> {
    const newOrder = this.OrderRepository.create(Order);
    await this.OrderRepository.save(newOrder);
    return newOrder;
  }

  async deleteOrder(id: number) {
    return await this.OrderRepository.delete(id);
  }
  async acceptOrder(id: number) :Promise<Order> {
    const order = await this.OrderRepository.findOne({
      where: { id: id },
      relations: {
        client: true,
        plant: true,
      },
    });

    order.state=OrderStateEnum.ACCEPTED;
    this.OrderRepository.save(order);
    return order;
  }

  async refuseOrder(id: number) :Promise<Order> {
    const order = await this.OrderRepository.findOne({
      where: { id: id },
      relations: {
        client: true,
        plant: true,
      },
    });

    order.state=OrderStateEnum.REFUSED;
    this.OrderRepository.save(order);
    return order;
  }
}
