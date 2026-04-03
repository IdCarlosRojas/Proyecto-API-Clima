import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather') // Esta es la ruta base: http://localhost:3000/weather
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city') // El ':' le dice a Nest que esto es una variable (como Bogota o Madrid)
  async getWeather(@Param('city') city: string) {
    return await this.weatherService.getCityWeather(city);
  }
}