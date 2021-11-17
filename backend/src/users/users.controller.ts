import { ChangePasswordDto } from './dto/changepas-user.dto';
import { ResetPasswordDto } from './dto/reset-password-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customFileName } from 'src/common/custom-file-name';
import { S3ManagerService } from 'src/s3/s3-manager.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly s3ManagerService: S3ManagerService
  ) {}

  @Get('/employees')
  employees(@Req() req) {
    return this.usersService.employees(req);
  }

  @Get('/export')
  export(@Req() req, @Res() res){
    return this.usersService.export(req, res);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination:'./public/upload/avatar',
        filename:customFileName
      }),
    })
  )
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File,@Req() req) {
    const arr =  file.path.split('/');
    arr.splice(0, 1);
    const path = arr.join('/');
    this.s3ManagerService.upload("a.txt", 'khai', 'demo-bucket');
    return this.usersService.create(createUserDto, file);
  }


  @Patch('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(resetPasswordDto);
  }

  @Patch('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(changePasswordDto);
  }

  @Patch('confirm-request/:id')
  confirmRequest(@Req() req, @Param('id') id: number) {
    return this.usersService.confirmRequest(req, id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
