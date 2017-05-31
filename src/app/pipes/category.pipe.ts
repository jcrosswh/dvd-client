import { Pipe, PipeTransform  } from '@angular/core';

import { Inventory } from '../domain/inventory'

@Pipe({
    name: 'category'
})
export class CategoryPipe implements PipeTransform {

    transform(items: Inventory[], filterArray: string[]): Inventory[] {
        return items.filter(
          item => filterArray.length === 0 || filterArray.includes(item.category)
        );
    }
}
