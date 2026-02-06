import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepositoryAbstract } from './tasks.repository.abstract';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'test',
  id: '1',
  password: 'testPassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepositoryAbstract;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepositoryAbstract,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepositoryAbstract>(
      TasksRepositoryAbstract,
    );
  });
  describe('getAllTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      const mockValue = 'someValue';

      expect(tasksRepository.getTasks).not.toHaveBeenCalled();

      const result = await tasksService.getTasks(null, mockUser);

      expect(tasksRepository.getTasks).toHaveBeenCalled();

      expect(result).toEqual('someValue');
    });
  });
});
