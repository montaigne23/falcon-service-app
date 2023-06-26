import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fcfa'
})
export class FCFAPipe implements PipeTransform {
  transform(value: number): string {
    // Convert the value to FCFA format
    const formattedValue = value.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF' });

    // Return the formatted value
    return formattedValue.replace(/\sXAF$/, '');
  }
}
