export class University {
  name: string;
  state_province: string | null;
  web_pages: string[];
  domains: string[];

  constructor(
    name: string,
    state_province: string | null,
    web_pages: string[],
    domains: string[]
  ) {
    this.name = name;
    this.state_province = state_province;
    this.web_pages = web_pages;
    this.domains = domains;
  }
}
