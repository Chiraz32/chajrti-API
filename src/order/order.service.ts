import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStateEnum } from 'src/enum/orderState.enum';
import { Repository } from 'typeorm';
import { addOrderDto } from './Dto/addOrder.dto';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
  ) {}

  async getOrderByClient(): Promise<Order[]> {
    return await this.OrderRepository.find({
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
