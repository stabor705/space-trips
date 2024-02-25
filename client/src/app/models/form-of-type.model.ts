import {FormControl} from "@angular/forms";

export type FormOfType<T extends Record<PropertyKey, any>> = {
  [Property in keyof T]: FormControl<T[Property] | null>;
}
