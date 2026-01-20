import { CreateActivityDTO } from "../dtos/CreateActivityDTO";
import { Activity } from "../entities/Activity";


export interface ActivityRepository {
  create(createActivityDTO: CreateActivityDTO): Promise<Activity>;
}