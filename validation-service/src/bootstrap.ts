import { ServiceNames } from 'lyst-core-services/dist/constants'
import { registerService } from 'lyst-core-services/dist/service-wrappers';
import { getService } from './service';

getService()
.then((service) => {
  console.log(`service: ${service}`);
  registerService(ServiceNames.IValidationService, service);
})
.catch((error) => {
  console.log(`error: ${error}`);
});
