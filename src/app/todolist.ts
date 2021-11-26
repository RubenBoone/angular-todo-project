import { Item } from "./item";

export interface TodoList {
  id: number;
  name: string;
  category: string;
  items: Array<Item>;
}
