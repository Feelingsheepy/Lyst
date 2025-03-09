import { ValidationService } from 'lyst-core-services/dist/service-wrappers'
import { EntityType, MethodType } from 'lyst-core/dist/constants';
const validationService = new ValidationService('guest');
validationService.validate(EntityType.lyst, MethodType.create, [{ _id: undefined, name: "dogs" }])
.then((result) => {
  console.log(`find() returned: ${result}`);
})
.catch((error) => {
  setTimeout(() => {
    console.log(error);
  }, 2000);
  console.log(`Something went wrong: ${JSON.stringify(error)}`);
});

