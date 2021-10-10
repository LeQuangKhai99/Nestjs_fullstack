import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Article, User
    ])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class ArticlesModule {}
