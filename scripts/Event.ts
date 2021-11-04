export default interface Event {
  name: string;
  link: string;
  source: string;
  description: string;
  deprecate?: boolean;
  deprecateDescription: string;
}
