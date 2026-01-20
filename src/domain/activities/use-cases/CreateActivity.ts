import { CreateActivityDTO } from "../dtos/CreateActivityDTO";
import { ActivityRepository } from "../interface/ActivityRepository";


export class CreateActivity {
  constructor(private activityRepository: ActivityRepository) { }

  async execute(createActivityDTO: CreateActivityDTO) {
    return this.activityRepository.create(createActivityDTO)
  }
}