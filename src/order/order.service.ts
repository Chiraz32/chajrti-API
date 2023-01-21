import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entity/client.entity';
import { OrderStateEnum } from 'src/enum/orderState.enum';
import { UserRoleEnum } from 'src/enum/userRole.Enum';
import { addOrderDto } from 'src/order/Dto/addOrder.dto';
import { Order } from 'src/order/entity/order.entity';
import { Plant } from 'src/plant/entity/plant.entity';
import { PlantService } from 'src/plant/plant.service';
import { Repository } from 'typeorm';


@Injectable()
export class OrderService {
  plantService: PlantService;
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
    @InjectRepository(Plant)
    private PlantRepository: Repository<Plant>,
  ) { 
    this.plantService= new PlantService(PlantRepository);
  }

  async getOrders(user): Promise<Order[]> {
    console.log(user);
    if (user.role === UserRoleEnum.Admin) {
      return await this.OrderRepository.find({
        relations: {
          plant: true,
          client: true,
        },
      });
    }
//    it's not working
    else {
      let plants = await this.plantService.getAllPlants(user);
      var orders= [];
      for (const plant of plants)
       { orders.push( await
        this.OrderRepository.createQueryBuilder('order')
        .where('order.plant = :plant', { plant}).getCount()

        // await this.OrderRepository.findOneOrFail(
        //     {where : { plant :plant },
        // relations:{
        //     client :true,
        //     plant:true,
        // }},
            
        
       
        )


      }
      
      console.log(orders);
      return orders ;
    }
  }
  
  async addOrder(Order: addOrderDto, user: Client): Promise<Order> {
    if (user.role === UserRoleEnum.Admin || (user.role === UserRoleEnum.Buyer )) {
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
