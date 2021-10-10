import { Injectable } from "@nestjs/common";
import { Article } from "src/articles/entities/article.entity";
import { Action } from "src/common/enum/action.enum";
import { User } from "src/users/entities/user.entity";
import { Ability, InferSubjects, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability';

type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    
    if (user.role.name == 'admin') {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    can(Action.Update, Article, { user: user });
    can(Action.Delete, Article, { isPublish: false });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}