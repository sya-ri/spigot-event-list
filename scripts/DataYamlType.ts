import Event from "./Event";

export default interface DataYamlType {
  versions: {
    [name: string]: string;
  };
  events: Event[];
  excludeEvents: string[];
}
