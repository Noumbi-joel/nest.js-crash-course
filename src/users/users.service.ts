import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      email: 'wowus@huzsoti.ni',
      name: 'Jane',
      role: 'ADMIN',
    },
    {
      id: 2,
      email: 'ubusizuf@tazdu.ma',
      name: 'Cory',
      role: 'ENGINEER',
    },
    {
      id: 3,
      email: 'mi@coknozos.lc',
      name: 'Bertie',
      role: 'INTERN',
    },
    {
      id: 4,
      email: 'awwu@irepe.gw',
      name: 'Marion',
      role: 'ADMIN',
    },
    {
      id: 5,
      email: 'notgicura@wuetca.bf',
      name: 'Lucy',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User Not Found');
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User Role Not Found');

    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdatedUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
        };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
