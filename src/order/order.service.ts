import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entity/client.entity';
import { OrderStateEnum } from 'src/enum/orderState.enum';
import { UserRoleEnum } from 'src/enum/userRole.Enum';
import { Plant } from 'src/plant/entity/plant.entity';
import { PlantService } from 'src/plant/plant.service';
import { Repository } from 'typeorm';
import { addOrderDto } from './Dto/addOrder.dto';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  plantService: PlantService;
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
  ) { }

  // async getOrderByClient(user: Client): Promise<Order[]> {
  //   return await this.OrderRepository.find({
  //     where: { client: user },
  //     relations: {
  //       plant: true,
  //       client: true,
  //     },
  //   });
  // }

  async getOrders(user: Client): Promise<Order[]> {
    if (user.role === UserRoleEnum.Admin) {
      return await this.OrderRepository.find({
        relations: {
          plant: true,
          client: true,
        },
      });
    }
    else if (user.role === UserRoleEnum.Buyer) {
      return await this.OrderRepository.find({
        where: { client: user },
        relations: {
          plant: true,
          client: true,
        },
      });
    }
    else {
      const plants = await this.plantService.getAllPlants(user);
      plants.forEach(async plant => {
        return await this.OrderRepository.find({
          where: { plant: plant },
          relations: {
            plant: true,
            client: true,
          },
        });
      });
    }
  }
  // it's not working
  // async getOrderBySeller(user: Client): Promise<Order[]> {
  //   console.log(user);
  //   const plants = await this.plantService.getAllPlants(user);
  //   console.log(plants);
  //   return await this.OrderRepository.find({
  //     where: { plant: plants },
  //     relations: {
  //       plant: true,
  //       client: true,
  //     },
  //   });
  // }
  async addOrder(Order: addOrderDto, user: Client): Promise<Order> {
    if (user.role === UserRoleEnum.Admin || (user.role === UserRoleEnum.Buyer && user.id === Order.client.id)) {
      const newOrder = this.OrderRepository.create(Order);
      await this.OrderRepository.save(newOrder);
      return newOrder;
    }
    else {
      throw new UnauthorizedException();
    }
  }

  async deleteOrder(id: number, user: Client) {
    const toDelete = await this.OrderRepository.findOne({
      where: { id: id },
    });
    if (!toDelete) {
      throw new NotFoundException(`This order doesn't exist`);
    }
    else if (user.role === UserRoleEnum.Admin || (user.role === UserRoleEnum.Buyer && (toDelete.client.id === user.id))) {
      return await this.OrderRepository.delete(id);
    } else {
      throw new UnauthorizedException();
    }


  }
  async acceptOrder(id: number, user: Client): Promise<Order> {
    const order = await this.OrderRepository.findOne({
      where: { id: id },
      relations: {
        client: true,
        plant: true,
      },
    });
    if (user.role === UserRoleEnum.Admin || user.role === UserRoleEnum.Seller && order.plant.client.id === user.id) {
      order.state = OrderStateEnum.ACCEPTED;
      this.OrderRepository.save(order);
      return order;
    } else {
      throw new UnauthorizedException();
    }
  }

  async refuseOrder(id: number, user: Client): Promise<Order> {
    const order = await this.OrderRepository.findOne({
      where: { id: id },
      relations: {
        client: true,
        plant: true,
      },
    });

    if (user.role === UserRoleEnum.Admin || user.role === UserRoleEnum.Seller && order.plant.client.id === user.id) {
      order.state = OrderStateEnum.REFUSED;
      this.OrderRepository.save(order);
      return order;
    } else {
      throw new UnauthorizedException();
    }
  }
}
