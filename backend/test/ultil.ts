import { AppModule } from './../src/app.module';
import { ArticlesModule } from './../src/articles/articles.module';
import { ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

export const testApp = async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [
      AppModule,
			TypeOrmModule.forRoot({
				type: 'mysql',
				host: 'mysql',
				port: 3306,
				username: 'root',
				password: 'root',
				database: 'fullstack',

				entities: ["dist/**/*.entity{.ts,.js}"],
				synchronize: true,
				autoLoadEntities: true,
			}),
		],
	}).compile();

	const app = moduleFixture.createNestApplication();
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		transformOptions: {
			enableImplicitConversion: true
		}
	}));
	await app.init();
	return app;
}