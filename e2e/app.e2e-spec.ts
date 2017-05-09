import { DvdClientPage } from './app.po';

describe('dvd-client App', () => {
  let page: DvdClientPage;

  beforeEach(() => {
    page = new DvdClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
