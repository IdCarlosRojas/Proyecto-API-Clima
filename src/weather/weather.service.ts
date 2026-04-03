import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCityWeather(city: string) {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      return {
        ciudad: data.name,
        temperatura: Math.round(data.main.temp),
        sensacion: Math.round(data.main.feels_like),
        humedad: data.main.humidity,
        viento: data.wind.speed,
        descripcion: data.weather[0].description,
        icono: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al conectar con la API de clima');
    }
  }
}