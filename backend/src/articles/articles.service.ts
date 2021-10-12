import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Public } from '../common/decorators/public.decorator';
import { Action } from '../common/enum/action.enum';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    @InjectRepository(User)
    private readonly userRepo:Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepo:Repository<Article>
  ) {}
  async create(createArticleDto: CreateArticleDto) {
    
  }

  @Public()
  async findAll() {
    const user = await this.userRepo.findOne({
      where: {
        id: 4
      },
      relations: ['role']
    });
    const ability = this.caslAbilityFactory.createForUser(user);
    const article = await this.articleRepo.findOne(2);
    console.log(article);
    
    console.log(
      ability.can(Action.Read, article),
      ability.can(Action.Update, article),
      ability.cannot(Action.Delete, article),
      ability.can(Action.Manage, article),
    );
    
    return 'sad';
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
