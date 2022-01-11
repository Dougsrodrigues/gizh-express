import { container } from 'tsyringe';

import { DateProvider } from '../providers/date-provider/date-provider';
import { IDateProvider } from '../providers/date-provider/date-provider-interface';

container.registerSingleton<IDateProvider>('DateProvider', DateProvider);
